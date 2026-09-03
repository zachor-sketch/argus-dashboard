const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
const base = 'https://zachor-sketch.github.io/argus-dashboard/';
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
(async()=>{
  const results = await Promise.all(['index.html','app.js','data.js','styles.css','favicon.svg','og.png'].map(async file=>{
    const response=await fetch(base+file,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
    if(!response.ok)return {file,status:response.status,match:false};
    const remote=Buffer.from(await response.arrayBuffer());
    const local=fs.readFileSync(path.join(root,file));
    const normalize=buffer=>file.endsWith('.png')?buffer:Buffer.from(buffer.toString('utf8').replace(/\r\n/g,'\n'));
    return {file,status:response.status,match:hash(normalize(local))===hash(normalize(remote))};
  }));
  console.log(JSON.stringify({url:base,results},null,2));
  if(results.some(r=>!r.match))process.exitCode=2;
})().catch(error=>{console.error(error.message);process.exitCode=1;});
