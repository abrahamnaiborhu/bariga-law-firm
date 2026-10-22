import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
function config(env = {}) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', "import {site,absoluteUrl} from './config/site.mjs';console.log(JSON.stringify({...site,about:absoluteUrl('/about-us/')}))"], {env:{...process.env,SITE_URL:'https://example.com/',SITE_INDEXABLE:'false',...env},encoding:'utf8'});
}
test('custom domain defaults to staging crawl policy', () => {
  const result = config(); assert.equal(result.status,0);
  const site = JSON.parse(result.stdout); assert.equal(site.base,'/'); assert.equal(site.indexable,false);
});
test('repository URLs retain the base for canonical URLs', () => {
  const result = config({SITE_URL:'https://abrahamnaiborhu.github.io/bariga-law-firm',SITE_INDEXABLE:'true'});
  const site = JSON.parse(result.stdout); assert.equal(site.base,'/bariga-law-firm/'); assert.equal(site.about,'https://abrahamnaiborhu.github.io/bariga-law-firm/about-us/'); assert.equal(site.indexable,true);
});
test('invalid deployment settings fail rather than publish wrong URLs', () => {
  for (const SITE_URL of ['http://example.com/','https://user:pass@example.com/','https://example.com/?query=x','https://example.com/#fragment']) assert.notEqual(config({SITE_URL}).status,0);
  assert.notEqual(config({SITE_INDEXABLE:'yes'}).status,0);
});
