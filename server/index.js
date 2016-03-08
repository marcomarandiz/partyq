import makeStore from './store';
import startServer from './server';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';
import request from 'request';

export const store = makeStore();

startServer(store);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const hostname = process.env.HOSTNAME || '0.0.0.0';
const app = express();

if (!isDeveloping) {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);

  app.use(webpackHotMiddleware(compiler));

  app.get('/', function response(req, res) {
    res.write('Splash page');
    res.end();
  });

  app.get('*', function response(req, res) {
    const host = 'http://' + req.headers.host + '/room';
    request(host).pipe(res);
  });
}

app.listen(port, hostname, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
