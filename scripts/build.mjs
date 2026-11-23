import { rm, mkdir, writeFile, cp } from "node:fs/promises";
import { resolve, join } from "node:path";
import {
  homepage,
  productPage,
  comparison,
  gettingStarted,
} from "../src/templates.mjs";
import { products } from "../src/products.mjs";
const root = resolve(import.meta.dirname, ".."),
  site = join(root, "site");
await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });
await cp(join(root, "assets"), join(site, "assets"), { recursive: true });
const pages = {
  "index.html": homepage(),
  "guides/comparison/index.html": comparison(),
  "guides/get-started/index.html": gettingStarted(),
};
for (const product of products)
  pages[`products/${product.id}/index.html`] = productPage(product);
for (const [name, html] of Object.entries(pages)) {
  const file = join(site, name);
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, html + "\n");
}
await writeFile(
  join(site, "assets/previews.mjs"),
  "export const previews = " +
    JSON.stringify(
      Object.fromEntries(
        products.map((p) => [p.id, { name: p.name, description: p.preview }]),
      ),
      "",
      "  ",
    ) +
    ";\n",
);
await writeFile(join(site, ".nojekyll"), "");
await writeFile(
  join(site, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: https://jlema0590.github.io/aikya-page/sitemap.xml\n",
);
await writeFile(
  join(site, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    Object.keys(pages)
      .map(
        (name) =>
          "<url><loc>https://jlema0590.github.io/aikya-page/" +
          name.replace("index.html", "") +
          "</loc></url>",
      )
      .join("") +
    "</urlset>\n",
);
console.log("Built " + Object.keys(pages).length + " static pages into site/.");
