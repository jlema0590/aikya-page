import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve(import.meta.dirname, "../site"),
  port = Number(process.env.PORT || 4178);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".mjs": "text/javascript",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (path === "/") {
      res.writeHead(302, { location: "/aikya-page/" });
      res.end();
      return;
    }
    if (!path.startsWith("/aikya-page/")) throw Error("Unknown prefix");
    let file = resolve(root, path.slice("/aikya-page/".length));
    if (file !== root && !file.startsWith(root + "/"))
      throw Error("Outside site");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log("Aikya preview: http://127.0.0.1:" + port + "/aikya-page/"),
);
