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


  const states=[];
  for(const [width,height] of [[1440,900],[1280,720],[1024,600],[390,844],[360,640]]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(400);
    for(const progress of [0,.5,1,.5,0]) {
      await evaluate(`(()=>{const e=document.querySelector('.home-scene');const r=e.getBoundingClientRect();const stage=e.querySelector('.scene-stage');const flowing=innerWidth<=850||innerHeight<620;const distance=flowing?innerHeight*.7:r.height-stage.clientHeight;scrollTo(0,r.top+scrollY+distance*${progress})})()`);await pause(100);
      const state=await evaluate(`(()=>{const e=document.querySelector('.home-scene');const p=e.querySelector('.scene-photograph').getBoundingClientRect();return {progress:e.dataset.progress,photo:{x:p.x,y:p.y,width:p.width,height:p.height},stageTop:e.querySelector('.scene-stage').getBoundingClientRect().top,overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('h1').length}})()`);
      states.push({width,height,requested:progress,...state});
      if(progress===0||progress===.5||progress===1){const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`${out}/scene-${width}-${progress}.png`,Buffer.from(shot.data,'base64'));}
    }
  }
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await pause(120);
  const reduced=await evaluate(`({progress:document.querySelector('.home-scene').dataset.progress,position:getComputedStyle(document.querySelector('.scene-stage')).position,animations:document.getAnimations().length})`);
  await call('Page.navigate',{url:'http://127.0.0.1:4173/#keahlian-kami'});await pause(300);
  const direct=await evaluate(`document.querySelector('#keahlian-kami').getBoundingClientRect().top`);
  await writeFile(`${out}/scene-results.json`,JSON.stringify({states,reduced,direct,errors},null,2));console.log(JSON.stringify({states,reduced,direct,errors}));
  if(errors.length||states.some(s=>s.overflow||s.headings!==1||Math.abs(Number(s.progress)-s.requested)>.05)||reduced.progress!=='1.000'||direct>40)process.exitCode=1;
}finally{socket?.close();chrome.kill();}
