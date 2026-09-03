"""Read-only source import. No source scripts are executed; only literal data is parsed."""
import re,json,ast,hashlib,openpyxl,datetime
from pathlib import Path
root=Path(__file__).resolve().parents[1]
html=(root/'ARGUS_Master_V10_25.html').read_text(encoding='utf-8')
s=re.findall(r'<script[^>]*>([\s\S]*?)</script>',html)[0]
pat=re.compile(r'''\s+|//[^\n]*|/\*[\s\S]*?\*/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[A-Za-z_$][\w$]*|[{}\[\]:,]''')
def extract(pos):
    tokens=[];end=pos;depth=0
    for m in pat.finditer(s,pos):
        if s[end:m.start()].strip():raise ValueError('Non-literal source input')
        end=m.end();v=m.group()
        if v.isspace() or v.startswith('//') or v.startswith('/*'):continue
        tokens.append(v)
        if v in ['{','[']:depth+=1
        if v in ['}',']']:depth-=1
        if depth==0:break
    it=iter(tokens);t=next(it)
    def val():
        nonlocal t
        cur=t;t=next(it,None)
        if cur in ['{','[']:
            d={} if cur=='{' else [];close='}' if cur=='{' else ']'
            while t!=close:
                if cur=='{':
                    k=ast.literal_eval(t) if t[0] in '\"\'' else t;t=next(it);assert t==':';t=next(it);d[k]=val()
                else:d.append(val())
                if t==',':t=next(it)
                else:break
            assert t==close;t=next(it,None);return d
        if cur[0] in '\"\'':return ast.literal_eval(cur)
        if cur in ['true','false','null']:return {'true':True,'false':False,'null':None}[cur]
        return float(cur) if '.' in cur or 'e' in cur.lower() else int(cur)
    return val()
out={m.group(1):extract(m.end()) for m in re.finditer(r'^const ([A-Z_0-9]+)\s*=\s*(?=[{\[])',s,re.M)}
engine=out['DECISION_ENGINE']
for key in ['ENGINE_EXTENSIONS','ENGINE_EXTENSIONS_V1015','ENGINE_EXTENSIONS_V1016','ENGINE_EXTENSIONS_V1017_LIVE']:
    for t,v in out[key].items():engine[t].update(v)
ledger=json.loads((root/'ARGUS_Validation_Ledger_V10_25.json').read_text(encoding='utf-8'))
ai=json.loads((root/'ARGUS_AI_Chain_Signal_V10_33.json').read_text(encoding='utf-8'))
baseline={'version':'V10.25','lockedBaselines':ledger['lockedBaselines'],'engine':engine,'stocks':out['DATA'],'weights':out['ENGINE_WEIGHTS'],'reviews':out['REVIEW_CONFIG']}
def normalize(v):
    if isinstance(v,dict):return {k:normalize(x) for k,x in v.items()}
    if isinstance(v,list):return [normalize(x) for x in v]
    if isinstance(v,float) and v.is_integer():return int(v)
    if isinstance(v,(datetime.datetime,datetime.date)):return v.isoformat()
    return v
baseline=normalize(baseline)
def digest(v):return hashlib.sha256(json.dumps(normalize(v),sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()
names=['ARGUS_Master_V10_25.html','ARGUS_Validation_Ledger_V10_25.json','ARGUS_AI_Chain_Signal_V10_33.json','ARGUS_Global_Opportunity_Universe_V10_33_AI_Chain_Signal.xlsx']
manifest={'canonicalBaselineSha256':digest(baseline),'sourceFiles':{n:hashlib.sha256((root/n).read_bytes()).hexdigest() for n in names}}
target=root/'integrity-manifest.json'
if target.exists() and json.loads(target.read_text())!=manifest:raise RuntimeError('Source or canonical baseline changed. Explicit baseline migration review required; manifest was NOT overwritten.')
target.write_text(json.dumps(manifest,indent=2)+'\n')
dest=root/'datasets';dest.mkdir(exist_ok=True)
def module(filename,name,value):
    (dest/filename).write_text('import { deepFreeze } from "../lib/integrity.js";\nexport const '+name+' = deepFreeze('+json.dumps(normalize(value),ensure_ascii=False,indent=2)+');\n',encoding='utf-8')
module('baseline_v10_25.js','BASELINE_V10_25',baseline)
module('proof_ledger.js','PROOF_LEDGER',{'ledger':ledger,'cohorts':[out['FORWARD_COHORT01_V1023'],out['FORWARD_COHORT02_V1024']],'independence':out['INDEPENDENCE_V1024'],'historicalAudit':out['FINAL_AUDIT_V1022'],'shadowCohort':out['SHADOW_COHORT01_V1023']})
module('event_log.js','EVENT_LOG',{'day0':out['DAY0_EVENT_QUEUE'],'protocol':out['EVENT_LOCK_PROTOCOL_V1024']})
wb=openpyxl.load_workbook(root/names[-1],read_only=True,data_only=True)
tables={}
for sheet in ['Company Universe','Owner Test 100','Source Coverage 100','P1 Deep Research','P2-A Deep Research','P2-B Deep Research','P2-C Deep Research','Simulation Rules']:
    rows=list(wb[sheet].values);head=next(i for i,r in enumerate(rows) if r and r[0] in ['Company ID','Rule ID'])
    headers=rows[head];tables[sheet]=[{str(k):normalize(v) for k,v in zip(headers,row) if k is not None} for row in rows[head+1:] if row and row[0]]
assert len(tables['Company Universe'])==100
module('universe_v10_33.js','UNIVERSE',tables)
shadow={k:v for k,v in out.items() if k.endswith(('V1026','V1027','V1029','V1030','V1031','V1032','V1033'))}
module('research_shadow.js','RESEARCH_SHADOW',{'ai':ai,'layers':shadow})
functions=s[s.index('const ENGINE_WEIGHTS'):s.index('const REVIEW_CONFIG')]
functions+=s[s.index('function opportunityMetric'):s.index('function renderUncertainty')]
# All functions in this region have been inspected. Preserve them verbatim.
prefix='''// Original arithmetic and gate logic, extracted verbatim from ARGUS_Master_V10_25.html.
// Adaptation: inputs and clock are isolated; this factory never writes to baseline data.
import { BASELINE_V10_25 as B } from '../datasets/baseline_v10_25.js';
export function originalEngine({asOf='2026-09-01T13:30:00+03:00',prices={},holdings={},calibration=[]}={}) {
 const NativeDate=globalThis.Date;
 const Date=class extends NativeDate {constructor(...args){super(...(args.length?args:[asOf]));}static now(){return new NativeDate(asOf).getTime();}};
 const DATA=B.stocks.map(s=>({...s,market:prices[s.ticker]===undefined?s.market:String(prices[s.ticker]??'')}));
 const DECISION_ENGINE=B.engine;
 const localStorage={getItem:()=>JSON.stringify(calibration)};
 const getHolding=t=>holdings[t]||{};
 function marketNumber(s){ return Number(String(s.market).replace(/[^0-9.]/g,'')) || 0; }
'''
exports='return {engineScore,evidenceFreshness,engineAdjustedScore,engineDecision,expectedValue,ensembleSummary,actionPriceBands,thesisClockState,forensicState,lineagePenalty,modelRiskMOS,newLayerPenalty,actionNow,portfolioFactorTotals,factorConcentrationPenalty,allocatorMetric,allocatorRank,opportunityMetric,opportunityRank,calibrationSummary};\n}\n'
(root/'lib').mkdir(exist_ok=True)
(root/'lib/engine_v10_25.js').write_text(prefix+functions+exports,encoding='utf-8')
print(json.dumps({'baselineHash':manifest['canonicalBaselineSha256'],'universe':len(tables['Company Universe']),'deepReviews':sum(len(v) for k,v in tables.items() if 'Deep Research' in k),'aiRecords':len(ai['records']),'sourceConstants':len(out)},indent=2))
