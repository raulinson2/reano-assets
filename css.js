const fs=require('fs');
const s=fs.readFileSync('C:/Users/rauli/reano-assets-work/paquetes-showcase.js','utf8');
const ms=[...s.matchAll(/(\w+_B64)\s*=\s*["']([A-Za-z0-9+/=]+)["']/g)];
for(const m of ms){
  const d=Buffer.from(m[2],'base64').toString('utf8');
  const i=d.indexOf('--wa:');
  console.log(m[1], 'len', d.length, '| --wa en', i);
  if(i>0) console.log('  >>', d.slice(i-160, i+90));
}
