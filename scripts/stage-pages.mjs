import fs from 'node:fs';
// Only intentional public runtime assets enter the Pages artifact.
fs.mkdirSync('_site',{recursive:true});
for(const name of ['index.html','app.js','app-v2.js','data.js','styles.css','favicon.svg','og.png','integrity-manifest.json','.nojekyll','lib','datasets','observer','ARGUS_Master_V10_25.html','ARGUS_Validation_Ledger_V10_25.json','ARGUS_AI_Chain_Signal_V10_33.json','ARGUS_Global_Opportunity_Universe_V10_33_AI_Chain_Signal.xlsx','SOURCE_MAP.md','RELEASE_V2.md','OBSERVER.md'])fs.cpSync(name,'_site/'+name,{recursive:true});
