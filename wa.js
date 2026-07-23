const fs=require('fs');
const s=fs.readFileSync('C:/Users/rauli/reano-assets-work/paquetes-showcase.js','utf8');
const m=s.match(/INNER_B64\s*=\s*["']([A-Za-z0-9+/=]+)["']/);
const html=Buffer.from(m[1],'base64').toString('utf8');
const i=html.indexOf('rt-btn-wa{');
console.log('en INNER_B64:', i);
if(i>0) console.log(html.slice(i, html.indexOf('}',i)+1));
