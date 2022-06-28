/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const compression = require('compression');
const setupProxy = require('./setupProxy');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(process.cwd(), 'build');

const expressStatic = express.static(DIST_DIR, {
  maxAge: 0,
  setHeaders(res, p) {
    if (p.includes(`${DIST_DIR}/static`)) {
      res.setHeader('cache-control', 'public, max-age=31536000, immutable');
    }
  }
});

const app = express();
app.use(compression());
app.use(expressStatic);
setupProxy(app);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (_, response) {
  response.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0');
