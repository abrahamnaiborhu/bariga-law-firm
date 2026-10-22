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
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      errors.push(JSON.stringify(msg.params.args));
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

  const base=process.env.CHECK_BASE || '/';
  const origin=process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
  const results=[];
  for(const width of [390,1440]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    for(const path of ['', 'about-us/', 'practice-areas/', 'lain-lain/', 'konsultasi/']) {
      await call('Page.navigate',{url:origin+base+path}); await pause(1800);
      const page=await evaluate(`({h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.loading!=='lazy'&&(!i.complete||!i.naturalWidth)).map(i=>i.src),main:!!document.querySelector('main'),enhanced:!!document.querySelector('.scene-enhanced,.about-enhanced')})`);
      if(!page.h1 || !page.main || page.overflow || page.brokenImages.length) throw Error(JSON.stringify({path,width,page}));
      results.push({path,width,...page});
    }
  }
  await call('Emulation.setScriptExecutionDisabled',{value:true});
  for(const path of ['', 'about-us/', 'practice-areas/', 'lain-lain/', 'konsultasi/']) {
    await call('Page.navigate',{url:origin+base+path});await pause(300);
    const dom=await call('DOM.getDocument');
    const {outerHTML}=await call('DOM.getOuterHTML',{nodeId:dom.root.nodeId});
    if(!outerHTML.includes('<main') || !outerHTML.includes('<h1')) throw Error('Missing static content '+path);
  }
  if(errors.length||network.length) throw Error(JSON.stringify({errors,network}));
  await writeFile(join(out,'deployment-smoke.json'),JSON.stringify({base,results,withoutJavaScript:'five pages contain main and h1',errors,network},null,2));
  console.log('Passed: 10 hydrated desktop/mobile pages, five static pages, no console/network errors. Base: '+base);
} finally {socket?.close();chrome.kill();await rm(profile,{recursive:true,force:true,maxRetries:8,retryDelay:150});}
