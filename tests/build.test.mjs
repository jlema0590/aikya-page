import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
const root = resolve(import.meta.dirname, "..");

test("the production artifact serves every navigable local page and asset under the project path", () => {
  const build = spawnSync(process.execPath, ["scripts/build.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(
    build.status,
    0,
    "The portal build must succeed: " + build.stderr,
  );
  const site = join(root, "site");
  for (const route of [
    "index.html",
    "products/harness/index.html",
    "products/forge/index.html",
    "products/mods/index.html",
    "guides/comparison/index.html",
    "guides/get-started/index.html",
  ]) {
    assert.ok(existsSync(join(site, route)), "Missing public route: " + route);
  }
  function inspect(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) {
        inspect(file);
        continue;
      }
      if (extname(file) === ".css") {
        const css = readFileSync(file, "utf8");
        for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
          if (match[1].startsWith("data:") || match[1].startsWith("#")) continue;
          assert.ok(existsSync(resolve(dirname(file), match[1])), "Broken CSS/font dependency: " + match[1]);
        }
      }
      if (extname(file) !== ".html") continue;
      const html = readFileSync(file, "utf8");
      for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        const url = match[1];
        if (/^(https?:|mailto:|#|data:)/.test(url)) continue;
        assert.ok(
          !url.startsWith("/"),
          "Asset/navigation must support a project subpath: " + url,
        );
        const target = resolve(dirname(file), url.split("#")[0].split("?")[0]);
        assert.ok(
          target.startsWith(site),
          "Local URL escapes the deployment: " + url,
        );
        assert.ok(
          existsSync(target),
          "Broken local URL in " + file + ": " + url,
        );
      }
    }
  }
  inspect(site);
});
