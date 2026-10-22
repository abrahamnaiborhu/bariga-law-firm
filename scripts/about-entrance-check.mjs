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


 const runs=[];
 for(const [width,height] of [[1440,900],[390,844],[360,640],[320,640]]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/about-us/'});await pause(160);
  const sample=()=>evaluate(`({active:document.getAnimations().length,portrait:getComputedStyle(document.querySelector('.cutout-rise')).transform,shape:getComputedStyle(document.querySelector('.portrait-arch-motion')).transform,line:getComputedStyle(document.querySelector('.portrait-orbit ellipse')).strokeDashoffset,badges:document.querySelectorAll('.portrait-tag').length,overflow:document.documentElement.scrollWidth>innerWidth})`);
  const start=await sample();
  await pause(500);const middle=await sample();
  await pause(1300);const end=await sample();
  const scrollSample=()=>evaluate(`({arch:getComputedStyle(document.querySelector('.portrait-arch')).transform,orbit:getComputedStyle(document.querySelector('.portrait-orbit')).transform,title:getComputedStyle(document.querySelector('.about-title-second')).transform})`);
  const beforeScroll=await scrollSample();
  await evaluate(`scrollTo(0,180)`);await pause(100);const duringScroll=await scrollSample();
  await evaluate(`scrollTo(0,0)`);await pause(100);const afterScroll=await scrollSample();
  const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(`${out}/about-animated-${width}.png`,Buffer.from(shot.data,'base64'));
  await call('Page.navigate',{url:'about:blank'});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/about-us/'});await pause(200);
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await pause(100);
  const cancelled=await sample();
  await call('Page.navigate',{url:'about:blank'});await call('Page.navigate',{url:'http://127.0.0.1:4173/about-us/'});await pause(150);
  const reduced=await sample();
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  runs.push({width,start,middle,end,beforeScroll,duringScroll,afterScroll,cancelled,reduced});
 }
 await writeFile(`${out}/about-entrance-results.json`,JSON.stringify({runs,errors},null,2));console.log(JSON.stringify({runs,errors}));
 if(errors.length||runs.some(r=>r.start.active===0||r.middle.line===r.start.line||r.end.active!==0||r.end.line!=='0px'||r.end.badges!==0||r.end.overflow||r.beforeScroll.arch===r.duringScroll.arch||r.beforeScroll.arch!==r.afterScroll.arch||r.cancelled.active!==0||r.reduced.active!==0))process.exitCode=1;
 }finally{socket?.close();chrome.kill();}
