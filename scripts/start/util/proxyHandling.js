import httpProxy from 'http-proxy';
import chalk from 'chalk';


// send API requests to API port
const apiUrl = `${process.env.HTTPS ? 'https' : 'http'}://${process.env.API_HOST}:${process.env.API_PORT}`;

const proxy = httpProxy.createProxyServer({
  target: apiUrl,
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', onProxyError(apiUrl));

// We need to provide a custom onError function for httpProxyMiddleware.
// It allows us to log custom error messages on the console.
function onProxyError(proxy) {
  return function(err, req, res){
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    );
    console.log();

    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
        res.writeHead(500);
    }
    res.end(
      `Proxy error: Could not proxy request ${req.url} from ${host} to ${proxy} (${err.code}).`
    );
  }
}

export default (app, server) => {
  // Proxy API requests to API server
  app.use('/api', (req, res) => {
    proxy.web(req, res, {
      target: `${apiUrl}/api`
    });
  });

  app.use('/auth', (req, res) => {
    proxy.web(req, res, {
      target: `${apiUrl}/auth`
    });
  });

  app.use('/ws', (req, res) => {
    proxy.web(req, res, {
      target: `${apiUrl}/ws`
    });
  });

  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
  });
}
