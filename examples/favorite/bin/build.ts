import * as esbuild from 'esbuild';
import http from 'http';

const SERVE_PORT = 3003;
const PROXY_PORT = 3002;

// Create contexts
const context = await esbuild.context({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outdir: './dist',
});

await context.watch();
const { hosts, port } = await context.serve({
  servedir: './dist',
  port: SERVE_PORT,
});

http
  .createServer((req, res) => {
    const { url, method, headers } = req;

    const proxyReq = http.request(
      {
        port,
        method,
        headers,
        path: url,
        hostname: hosts[0],
      },
      (proxyRes) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(proxyRes.statusCode!, proxyRes.headers);

        proxyRes.pipe(res, { end: true });
      }
    );

    req.pipe(proxyReq, { end: true });
  })
  .listen(PROXY_PORT);

console.log(`Serving:`);
console.log(`<script async src="http://localhost:${PROXY_PORT}/index.js"></script>`);
