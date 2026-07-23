const fs=require('fs');
const P='C:/Users/rauli/reano-assets-work/paquetes-showcase.js';
let s=fs.readFileSync(P,'utf8');
const m=s.match(/CSS_B64\s*=\s*["']([A-Za-z0-9+/=]+)["']/);
let css=Buffer.from(m[1],'base64').toString('utf8');
console.log('ANTES:', css.slice(0,150));
const pasos=[['--wa:#25D366','--wa:#FF8C03'],['--wa2:#1ebe5a','--wa2:#E67A00'],
             ['rgba(37,211,102,.5)','rgba(255,140,3,.5)'],['rgba(37,211,102,.6)','rgba(255,140,3,.6)']];
const c={};
for(const [de,a] of pasos){ const n=css.split(de).length-1; c[de]=n; css=css.split(de).join(a); }
s=s.replace(m[1], Buffer.from(css,'utf8').toString('base64'));
fs.writeFileSync(P,s);
console.log('REEMPLAZOS:',c);
console.log('DESPUES:', css.slice(0,150));
