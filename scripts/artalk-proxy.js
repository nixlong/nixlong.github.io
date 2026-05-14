const http = require('http');

const ARTALK_HOST = '127.0.0.1';
const ARTALK_PORT = 23366;

hexo.extend.filter.register('server_middleware', function (app) {
  function matchPath(url) {
    return url.startsWith('/api/v2') || url.startsWith('/dist');
  }

  app.use(function (req, res, next) {
    if (!matchPath(req.url)) return next();

    var options = {
      hostname: ARTALK_HOST,
      port: ARTALK_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers
    };
    delete options.headers.host;

    var proxyReq = http.request(options, function (proxyRes) {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', function (err) {
      res.statusCode = 502;
      res.end('Proxy error: ' + err.message);
    });

    req.pipe(proxyReq);
  });

  console.log('[Artalk Proxy] /api/v2/* + /dist/* -> http://' + ARTALK_HOST + ':' + ARTALK_PORT);
});
