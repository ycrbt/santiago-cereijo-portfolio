import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("./dist-pages/", import.meta.url);
const assets = [
  "index.html",
  "styles.css",
  "script.js",
  "favicon.svg",
  "og-card.svg",
  "Santiago-Cereijo-CV.pdf",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  assets.map((asset) =>
    cp(new URL(`./${asset}`, import.meta.url), new URL(asset, outputDirectory)),
  ),
);

console.log(`Prepared ${assets.length} static assets in dist-pages.`);
