import fs from 'node:fs';
// Only intentional public runtime assets enter the Pages artifact.
fs.mkdirSync('_site',{recursive:true});
for(const name of ['index.html','app.js','app-v2.js','data.js','styles.css','favicon.svg','og.png','integrity-manifest.json','.nojekyll','lib','datasets','observer'])fs.cpSync(name,'_site/'+name,{recursive:true});
