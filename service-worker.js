const CACHE='milk-attendance-shell-v13';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon.svg','./icons/icon-maskable.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith((async()=>{
  const isPage=event.request.mode==='navigate'||new URL(event.request.url).pathname.endsWith('/index.html')||new URL(event.request.url).pathname.endsWith('/');
  if(isPage){
   try{const response=await fetch(event.request,{cache:'no-store'});if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}
   catch(error){return (await caches.match(event.request))||(await caches.match('./index.html'));}
  }
  const cached=await caches.match(event.request);if(cached)return cached;
  const response=await fetch(event.request);
  if(new URL(event.request.url).origin===self.location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
  return response;
})());
});
