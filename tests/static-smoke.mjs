import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /^<!DOCTYPE html>/i, "index.html mora biti potpuni HTML dokument");
assert.match(html, /<html\b[^>]*\blang=["']hr["']/i, "jezik dokumenta mora biti hrvatski");
assert.match(html, /<meta\b[^>]*\bname=["']viewport["']/i, "nedostaje viewport meta oznaka");
assert.match(html, /<title>Raspored pripravnosti[^<]*<\/title>/i, "naslov aplikacije nije pronađen");
assert.match(html, /id=["']generateBtn["']/i, "glavna kontrola za generiranje nije pronađena");
assert.match(html, /id=["']statusBox["']/i, "status aplikacije nije pronađen");

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(
  (match) => match[1],
);

assert.ok(inlineScripts.length > 0, "nije pronađen JavaScript aplikacije");
assert.equal((html.match(/<script[^>]+src=/gi) ?? []).length, 0, "pronađena je vanjska skripta");
assert.equal((html.match(/<link[^>]+href=/gi) ?? []).length, 0, "pronađen je vanjski stylesheet");

for (const [index, script] of inlineScripts.entries()) {
  assert.doesNotThrow(() => new Function(script), `JavaScript blok ${index + 1} nema valjanu sintaksu`);
}

console.log(
  JSON.stringify(
    {
      bytes: Buffer.byteLength(html),
      inlineScripts: inlineScripts.length,
      externalScripts: 0,
      externalStylesheets: 0,
      syntaxValid: true,
    },
    null,
    2,
  ),
);
