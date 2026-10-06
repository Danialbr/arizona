const C='arizona-v13';const F=['./','index.html','three.module.js','manifest.json','apple-touch-icon.png','icon-192.png','icon-512.png','favicon.png','jsm/controls/OrbitControls.js','jsm/postprocessing/EffectComposer.js','jsm/postprocessing/RenderPass.js','jsm/postprocessing/UnrealBloomPass.js','jsm/postprocessing/OutputPass.js','jsm/postprocessing/Pass.js','jsm/postprocessing/ShaderPass.js','jsm/postprocessing/MaskPass.js','jsm/shaders/CopyShader.js','jsm/shaders/LuminosityHighPassShader.js','jsm/shaders/OutputShader.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// HTML: network first (always the latest version), offline falls back to cache. Everything else: cache first.
self.addEventListener('fetch',e=>{const r=e.request;const html=r.mode==='navigate'||r.url.endsWith('.html')||r.url.endsWith('/');
 if(html){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
