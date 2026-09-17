import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const { default: worker } = await import("../dist/server/index.js");
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
}

test("renders Ruby with working section links and existing gallery assets", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ruby Tattoo Studio \| Balıkesir/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, "Section IDs must be unique");
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(target), `Missing navigation target: ${target}`);
  }
  const imagePaths = [...new Set([...html.matchAll(/<img[^>]+src="(\/[^"?]+)"/g)].map(match => match[1]))];
  await Promise.all(imagePaths.map(path => access(new URL(`../public${path}`, import.meta.url))));
  assert.ok(html.indexOf('id="about"') > html.indexOf('id="booking"'));
});

test("offers a tattoo reference file instead of a style or piercing appointment", async () => {
  const html = await (await render()).text();
  assert.match(html, /type="file"[^>]*name="reference"/);
  assert.match(html, /Fotoğrafınız bu siteye kaydedilmez/);
  assert.doesNotMatch(html, /name="style"|Piercing randevusu al|STÜDYO MİSAFİRİ|menu-toggle/);
  assert.match(html, /Piercing için randevu gerekmiyor/);
});
