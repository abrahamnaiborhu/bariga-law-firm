import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm, readFile } from 'node:fs/promises';

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(project, 'docs/build-evidence');
await mkdir(out, { recursive: true });
const profile = `/private/tmp/bariga-review-profile-${process.pid}`;
const chrome = spawn(process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let stderr = '';
    const timer = setTimeout(() => reject(new Error('Chrome startup timed out')), 15000);
    chrome.stderr.on('data', d => {
      stderr += d.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    chrome.on('error', reject);
  });
  const port = new URL(endpoint).port;
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find(t => t.type === 'page');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let seq = 0;
  const pending = new Map();
  let network = [];
  let errors = [];
  socket.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id) {
      const p = pending.get(msg.id);
      if (p) { pending.delete(msg.id); clearTimeout(p.timer); msg.error ? p.reject(msg.error) : p.resolve(msg.result); }
    } else if (msg.method === 'Network.loadingFailed') {
      network.push({ type: 'failed', error: msg.params.errorText, resourceType: msg.params.type });
    } else if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
      network.push({ type: 'http', status: msg.params.response.status, url: msg.params.response.url });
    } else if (msg.method === 'Runtime.exceptionThrown') {
      errors.push(msg.params.exceptionDetails.text + ': ' + (msg.params.exceptionDetails.exception?.description || ''));
    }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, 30000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  const version = await call('Browser.getVersion');
  console.log('Browser:', version.product);


 const readings=[];const boundaries=[];
 for(const [width,height] of [[1280,720],[430,718],[390,844],[360,640]]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(250);
  for(const progress of [0,.5,1,.5,0]) {
   await evaluate(`(()=>{const e=document.querySelector('.home-scene');const distance=innerWidth<=850?innerHeight*.7:e.offsetHeight-e.querySelector('.scene-stage').clientHeight;scrollTo(0,e.getBoundingClientRect().top+scrollY+distance*${progress})})()`);await pause(100);
   const result=await evaluate(`(()=>{const root=document.querySelector('.home-scene');const photo=root.querySelector('.scene-photograph').getBoundingClientRect();const text=root.querySelector('.scene-body').getBoundingClientRect();return {progress:root.dataset.progress,overlap:Math.max(0,photo.bottom-text.top),cloneBody:getComputedStyle(root.querySelector('.scene-light-copy .scene-body')).visibility,overflow:document.documentElement.scrollWidth>innerWidth}})()`);
   boundaries.push({width,requested:progress,...result});
   if(progress===0||progress===.5||progress===1){const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`${out}/home-mobile-v4-${width}-${progress}.png`,Buffer.from(shot.data,'base64'));}
  }
  for(const [route,selector] of [['/practice-areas/','.folio-art'],['/about-us/','.partner-story'],['/lain-lain/','.city-triptych'],['/konsultasi/','.guided-process']]) {
   await call('Page.navigate',{url:'http://127.0.0.1:4173'+route});await pause(220);
   const count=await evaluate(`document.querySelectorAll('.home-scene').length`);if(count)errors.push('Homepage scene repeated at '+route);
   for(const progress of [.15,.65,1,.15]) {
    await evaluate(`(()=>{const e=document.querySelector('${selector}');scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight*.75+(e.offsetHeight+innerHeight*.15)*${progress})})()`);await pause(100);
    const result=await evaluate(`(()=>{const e=document.querySelector('${selector}');return {progress:e.dataset.readingProgress,overflow:document.documentElement.scrollWidth>innerWidth,clip:e.querySelector('.folio-window')?getComputedStyle(e.querySelector('.folio-window')).clipPath:null,city:e.querySelector('.city-panel')?getComputedStyle(e.querySelector('.city-panel')).transform:null}})()`);
    readings.push({width,route,requested:progress,...result});
   }
   if(width===390||width===1280){const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`${out}/distinct-${route.split('/')[1]}-${width}.png`,Buffer.from(shot.data,'base64'));}
  }
 }
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await pause(120);
 const reduced=await evaluate(`({progress:document.querySelector('.guided-process').dataset.readingProgress,animations:document.getAnimations().length})`);
 await call('Page.navigate',{url:'http://127.0.0.1:4173/practice-areas/#arbitrase'});await pause(250);
 const deep=await evaluate(`({top:document.querySelector('#arbitrase').getBoundingClientRect().top,active:document.querySelector('.reading-index a[aria-current]')?.getAttribute('href')})`);
 await call('Network.setCacheDisabled',{cacheDisabled:true});
 await call('Network.setBlockedURLs',{urls:['*architecture*.jpg*']});
 await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(350);
 const failedImage=await evaluate(`({failed:document.querySelector('.scene-photograph img').naturalWidth===0,heading:!!document.querySelector('h1'),bodyColor:getComputedStyle(document.querySelector('.scene-body .scene-intro')).color,action:document.querySelector('.scene-actions a').getAttribute('href')})`);
 await writeFile(`${out}/distinct-motion-results.json`,JSON.stringify({boundaries,readings,reduced,deep,failedImage,errors},null,2));console.log(JSON.stringify({boundaries,readings,reduced,deep,failedImage,errors}));
 if(!failedImage.failed||!failedImage.heading||failedImage.action!=='/konsultasi/'||errors.length||boundaries.some(s=>s.overflow||(s.width<=850&&(s.overlap>1||s.cloneBody!=='hidden')))||readings.some(s=>s.overflow||Math.abs(+s.progress-s.requested)>.08)||reduced.progress!=='1.000'||deep.top>40||deep.active!=='#arbitrase')process.exitCode=1;
 }finally{socket?.close();chrome.kill();}
