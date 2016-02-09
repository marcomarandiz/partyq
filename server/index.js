import makeStore from './store';
import startServer from './server';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';
import rewrite from 'express-urlrewrite';

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

  app.use(rewrite(/\/[a-zA-Z0-9]+$/, '/'));

  app.use(webpackMiddleware(compiler, {
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
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.listen(port, hostname, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
