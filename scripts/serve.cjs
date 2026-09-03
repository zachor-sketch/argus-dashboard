const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const allowed = new Set(['index.html','styles.css','app.js','data.js','favicon.svg','og.png']);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
http.createServer((req,res)=>{
  let name;
  try { name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'') || 'index.html'; } catch { res.writeHead(400).end(); return; }
  if(!allowed.has(name)){res.writeHead(404).end('Not found');return;}
  fs.readFile(path.join(root,name),(error,data)=>{
    if(error){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(name)],'Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(4173,'127.0.0.1',()=>console.log('ARGUS preview: http://127.0.0.1:4173'));
