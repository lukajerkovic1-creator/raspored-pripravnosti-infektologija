import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const target = resolve(process.cwd(), process.argv[2] ?? "index.html");
const html = await readFile(target, "utf8");

const requiredIds = [
  "settingsMain",
  "legacyDetailView",
  "a4Editor",
  "a4BackBtn",
  "a4SaveBtn",
  "a4CancelBtn",
  "a4ZoomOutBtn",
  "a4ZoomInBtn",
  "a4ZoomFitBtn",
  "a4DoctorRail",
  "a4ScheduleTable",
  "a4SummaryBody",
  "a4Validation",
];

for (const id of requiredIds) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `nedostaje #${id}`);
}

assert.match(html, /const APP_VERSION\s*=\s*['"]0\.10\.46['"]/, "verzija mora biti 0.10.46");
assert.match(html, /#legacyDetailView\s*\{[^}]*display\s*:\s*none\s*!important/i, "stari detaljni prikaz mora ostati skriven");
assert.match(html, /\.a4-page-sizer\s*\{[^}]*794px[^}]*1123px/i, "A4 omjer mora koristiti 794 × 1123 px");
assert.match(html, /state\.rows\s*=\s*cloneScheduleRows\(draft\.rows\)/, "spremanje mora prenijeti nacrt u službeni raspored");
assert.match(html, /replaceWordScheduleTableRows\(tbl,state\.rows\)/, "Word mora koristiti spremljene službene retke");
assert.match(html, /rows\s*:\s*state\.rows/, "JSON mora koristiti spremljene službene retke");

const requiredRegressionNames = [
  "A4 odmah ažurira ukupan broj pripravnosti nakon promjene nacrta",
  "A4 nacrt ne mijenja službeni raspored prije spremanja",
  "Odustajanje obnavlja zadnju spremljenu vrijednost",
  "Višestruki godišnji stvara konflikt samo u povezanoj raspoređenoj ćeliji",
  "Ignoriranje vrijedi samo u trenutačnom nacrtu i resetira se novom generacijom",
  "A4 spremanje upisuje vrijednost u službeno stanje i audit s A4 oznakom",
  "Potvrđeni A4 redak jednak je JSON, MD i Word izvozu",
  "Isticanje liječnika boji samo ćelije pripravnosti",
  "Mobilni A4 zadržava omjer stranice i ručne zoom kontrole",
];

for (const name of requiredRegressionNames) {
  assert.ok(html.includes(name), `nedostaje regresijski test: ${name}`);
}

console.log(
  JSON.stringify(
    {
      file: target,
      requiredUiContracts: requiredIds.length,
      requiredRegressionContracts: requiredRegressionNames.length,
      version: "0.10.46",
      valid: true,
    },
    null,
    2,
  ),
);
