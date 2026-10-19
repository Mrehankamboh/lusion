const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 3020;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.stat(file, (err, stat) => {
    const target = !err && stat.isDirectory() ? path.join(file, "index.html") : file;
    fs.readFile(target, (readErr, buf) => {
      if (readErr) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(target).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(buf);
    });
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Lusion clone http://127.0.0.1:${port}/`);
});
