const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const files=['app.js','app-v2.js','data.js',...['lib','datasets'].flatMap(dir=>fs.readdirSync(dir).filter(f=>f.endsWith('.js')).map(f=>path.join(dir,f)))];
for(const f of files){const r=spawnSync(process.execPath,['--check',f],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1)}
console.log('PASS: syntax checked '+files.length+' application modules');
