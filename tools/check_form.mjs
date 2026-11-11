import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../assets/site.js',import.meta.url),'utf8');
async function scenario({lang='en',ok=true,valid=true,disabled=false}={}) {
 const callbacks={};let requests=0;let reset=false;
 const submit={disabled};const status={textContent:''};const fallback={hidden:true};const open={focus(){},href:''};const copy={addEventListener(){}};
 const form={action:'https://formspree.io/f/xlgaobby',elements:{service:{}},reportValidity:()=>valid,addEventListener:(event,fn)=>callbacks[event]=fn,querySelector:()=>submit,setAttribute(){},removeAttribute(){},reset(){reset=true;}};
 const document={documentElement:{lang},querySelector:s=>({'#inquiry-form':form,'#email-fallback':fallback,'#copy-inquiry':copy,'#inquiry-status':status,'#open-email':open}[s]||null),querySelectorAll:()=>[]};
 class FormData {get(k){return ({name:'Test',email:'test@example.com',business:'Example',service:'Paid advertising',goal:'Improve inquiries'})[k]||'';}}
 runInNewContext(source,{document,FormData,AbortSignal,URL,location:{hash:''},navigator:{},fetch:async()=>{requests++;return {ok};}});
 await callbacks.submit({preventDefault(){}});
 return {requests,reset,status:status.textContent,fallback:fallback.hidden,disabled:submit.disabled,href:open.href};
}
let r=await scenario();assert.equal(r.requests,1);assert.equal(r.reset,true);assert.match(r.status,/was received/);assert.equal(r.fallback,true);assert.equal(r.disabled,false);
r=await scenario({lang:'es'});assert.match(r.status,/fue recibida/);
r=await scenario({ok:false});assert.equal(r.reset,false);assert.equal(r.fallback,false);assert.match(r.status,/could not confirm/);assert.match(r.href,/mailto:aaron@keystonegrowth.org/);assert.equal(r.disabled,false);
r=await scenario({valid:false});assert.equal(r.requests,0);
r=await scenario({disabled:true});assert.equal(r.requests,0);
console.log('PASS form success (EN/ES), failure fallback, validation and duplicate-submit guard; no external requests made.');
