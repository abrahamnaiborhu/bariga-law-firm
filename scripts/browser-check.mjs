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

  const checks=[];
  for (const width of [320,360,390,768,1024,1280,1440]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:width===1280?720:width<800?844:900,deviceScaleFactor:1,mobile:false});
    for (const route of ['/','/about-us/','/practice-areas/','/lain-lain/','/konsultasi/']) {
      await call('Page.navigate',{url:'http://127.0.0.1:4173'+route});
      await pause(450);
      const result=await evaluate(`(()=>({title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0,lazy:i.loading==='lazy'})),brokenLinks:[...document.querySelectorAll('a')].filter(a=>a.getAttribute('href')==='#').length,services:document.querySelectorAll('.service-row').length,forms:document.forms.length}))()`);
      checks.push({width,route,...result});
      if (width===390||width===1440) {
        const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
        await writeFile(`${out}/${route==='/'?'home':route.split('/')[1]}-${width}.png`,Buffer.from(shot.data,'base64'));
      }
    }
  }
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(300);
  await evaluate(`document.querySelector('.menu-toggle').click()`);
  const menuOpen=await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'&&getComputedStyle(document.querySelector('#primary-nav')).display!=='none'`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  const menuEscape=await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'&&document.activeElement===document.querySelector('.menu-toggle')`);
  await call('Page.navigate',{url:'http://127.0.0.1:4173/practice-areas/#arbitrase'});await pause(500);
  const anchor=await evaluate(`({y:document.querySelector('#arbitrase').getBoundingClientRect().top,hash:location.hash})`);
  await evaluate(`document.querySelector('#arbitrase .text-link').click()`);await pause(400);
  const contact=await evaluate(`({path:location.pathname,wa:document.querySelector('.contact-channels a').href,email:document.querySelectorAll('.contact-channels a')[1].href})`);
  await evaluate(`history.back()`);await pause(400);
  const back=await evaluate(`({path:location.pathname,hash:location.hash,y:document.querySelector('#arbitrase')?.getBoundingClientRect().top})`);
  await call('Page.reload');await pause(400);
  const refresh=await evaluate(`document.querySelector('#arbitrase')?.getBoundingClientRect().top`);
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const reduced=await evaluate(`getComputedStyle(document.querySelector('.text-link svg')).transitionDuration`);
  await call('Network.setBlockedURLs',{urls:['*architecture*.jpg*','*partner.jpg*']});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(400);
  const imageFailure=await evaluate(`({heading:!!document.querySelector('h1'),action:document.querySelector('.scene-actions a').href,overflow:document.documentElement.scrollWidth>innerWidth})`);


  const source=JSON.parse(await readFile(join(project, 'creative/directions/boutique-v3/inner-pages/content-baseline.json'),'utf8'));
  const copyChecks=[];
  for(const [route,key] of [['/about-us/','about'],['/practice-areas/','practice'],['/lain-lain/','strategic'],['/konsultasi/','consult']]) {
    await call('Page.navigate',{url:'http://127.0.0.1:4173'+route});await pause(350);
    const body=await evaluate(`document.querySelector('main').innerText`);
    const normalize=t=>t.replace(/\s+/g,' ').trim();
    const blocks=source[key].split('\n\n').filter(b=>b.length>100);
    copyChecks.push({route,missing:blocks.filter(b=>!normalize(body).includes(normalize(b)))});
  }
  await call('Page.navigate',{url:'http://127.0.0.1:4173/practice-areas/#%'});await pause(350);
  const invalidHash=await evaluate(`!!document.querySelector('h1')`);
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(350);
  await evaluate(`document.documentElement.style.fontSize='200%'`);
  const enlarged=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,menu:!!document.querySelector('.menu-toggle')})`);

  await call('Network.setBlockedURLs',{urls:[]});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(350);
  await evaluate(`document.activeElement.blur()`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
  await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
  const keyboard=await evaluate(`({tag:document.activeElement.tagName,text:document.activeElement.textContent})`);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  // Isolate the loading sample from same-URL navigation and prior test mutations.
  await call('Page.navigate',{url:'about:blank'});
  await call('Network.setCacheDisabled',{cacheDisabled:true});
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.__metrics={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__metrics.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value}).observe({type:'layout-shift',buffered:true});`});
  await call('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
  await call('Emulation.setCPUThrottlingRate',{rate:4});
  await call('Page.navigate',{url:'http://127.0.0.1:4173/'});await pause(6000);
  const performanceSample=await evaluate(`({metrics:window.__metrics,transfer:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,transfer:r.transferSize}))})`);

  const report={copyChecks,invalidHash,enlarged,keyboard,performanceSample,browser:version.product,mode:'Headless Chrome on macOS, viewport emulation; no physical-device testing',checks,menuOpen,menuEscape,anchor,contact,back,refresh,reduced,imageFailure,errors,network};
  await writeFile(`${out}/results.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
  const failures = [
    ...checks.filter(c => c.overflow || c.brokenLinks || c.forms || !c.h1),
    ...copyChecks.filter(c => c.missing.length),
    ...errors,
  ];
  if (!menuOpen || !menuEscape || anchor.y > 40 || back.y > 40 || refresh > 40
      || contact.path !== '/konsultasi/' || !invalidHash
      || keyboard.text !== 'Langsung ke konten' || reduced !== '0s'
      || imageFailure.overflow || !imageFailure.heading) failures.push('Interaction regression');
  if (failures.length) { console.error(failures); process.exitCode = 1; }

} finally { socket?.close(); chrome.kill(); }
