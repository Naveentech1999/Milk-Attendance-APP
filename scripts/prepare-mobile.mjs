import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const out = new URL("../mobile/www/", import.meta.url);
await mkdir(out, { recursive: true });
for (const file of ["index.html", "manifest.webmanifest", "service-worker.js"]) {
  const from = new URL(file, root);
  if (!existsSync(from)) throw new Error(`Required app file missing: ${file}`);
  await cp(from, new URL(file, out));
}
for (const dir of ["assets", "icons"]) {
  const from = new URL(dir, root);
  if (existsSync(from)) await cp(from, new URL(dir, out), { recursive: true, force: true });
}
await cp(new URL("../mobile/mobile-theme.css", import.meta.url), new URL("mobile-theme.css", out));
await cp(new URL("../mobile/mobile-realtime.js", import.meta.url), new URL("mobile-realtime.js", out));
const indexPath = new URL("index.html", out);
let html = await readFile(indexPath, "utf8");
if (!html.includes("mobile-theme.css")) {
  html = html.replace("</head>", '<link rel="stylesheet" href="./mobile-theme.css"></head>');
}
if (!html.includes("mobile-realtime.js")) {
  html = html.replace("</body>", '<script src="./mobile-realtime.js"></script></body>');
}
html = html.replace(/<meta name="theme-color" content="[^"]*">/i, '<meta name="theme-color" content="#5045c5">');
await writeFile(indexPath, html);
console.log("Prepared Doodhwala mobile web bundle in mobile/www");
