/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require */
const path = require('path');
const glob = require('glob');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const utils = require('./_utils');

const { NODE_ENV, ENABLE_MOCK_API } = process.env;
const FALLBACK_TARGET = NODE_ENV === 'production' ? 'https://social-insurance-app.herokuapp.com' : 'http://localhost:3001';

// load mock scripts in `api_mocks` folder, that has name does not start with underscore _
const mockScriptPathPattern = `${path.resolve(__dirname, '../api_mocks/')}/**/!(_)*.js`;
const MOCKS = ENABLE_MOCK_API === 'true' ? glob.sync(mockScriptPathPattern).map(p => {
  const endpoint = p
    .replace(`${process.env.PWD}/api_mocks`, '/api/v1')
    .replace(/\.js$/, '')
    .replace(/_?id/g, '\\w+');
  return {
    ...require(p),
    pathReg: new RegExp(`^${endpoint}$`),
    $utils: utils
  };
}) : [];

const getMockFor = ({ method, url, headers, rawHeaders }) => MOCKS.find(m => {
  const reqPath = url.split('?', 2)[0];
  if (typeof m.test === 'function') {
    return m.test({ method, url, headers, rawHeaders, path: reqPath });
  };

  const methods = Array.isArray(m.methods) ? m.methods : [];
  return m.pathReg.test(reqPath) && (methods.length === 0 || methods.includes(method));
});
const proxyDelayer = (req, res, next) => {
  // TODO: find a way to avoid the need of prepend `/api`
  const mocker = getMockFor({ ...req, url: `/api${req.url}` });
  if (mocker && mocker.delay) {
    const delay = mocker.delay || 0;
    const { req: delayReq, res: delayRes } = delay;
    // Delay request
    setTimeout(next, delayReq || delay);

    // Delay response completion
    const endOriginal = res.end;
    res.end = function (...args) {
      setTimeout(() => endOriginal.apply(res, args), delayRes || delay);
    };
  } else {
    next();
  }
};
const proxy = createProxyMiddleware({
  target: process.env.REACT_APP_API_ORIGIN || FALLBACK_TARGET,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq(proxyReq, req) {
    if (req.body && Object.keys(req.body).length) {
      // Ref:
      // https://github.com/chimurai/http-proxy-middleware/issues/299#issue-362871819
      // https://github.com/http-party/node-http-proxy/issues/1279#issuecomment-429378935
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
      proxyReq.end();
    }
  },
  selfHandleResponse: true,
  onProxyRes(proxyRes, req, res) {
    const mocker = getMockFor(req);
    const status = (mocker && mocker.mock(proxyRes, req, res)) || proxyRes.statusCode;

    res.writeHead(status, proxyRes.headers);
    proxyRes.pipe(res);
  }
});

module.exports = function (app) {
  const callbacks = [
    cookieParser(),
    bodyParser.json(),
    proxy
  ];
  if (NODE_ENV !== 'production' && ENABLE_MOCK_API === 'true') {
    callbacks.unshift(proxyDelayer);
  }
  app.use('/api', callbacks);
};

