/* eslint-disable import/no-extraneous-dependencies */
const modifyResponse = require('node-http-proxy-json');

module.exports = {
  test: (req) => {
    const { method, url } = req;
    return method === 'GET' && /^\/api\/v1\/offices\/[^/]+\/monthly_payments\/[^/]+\?page=\d+&per_page=\d+$/.test(url);
  },
  mock: (proxyRes, req, res)  => {
    delete proxyRes.headers['content-length'];

    modifyResponse(res, proxyRes, function () {
      return {
        meta: {
          month: '2020-11',
          total_count: 1
        },
        data: [
          {
            'id': 'm0w8poP3ggIgBA3lnDjXL2',
            'number': '',
            'name': 'N Kai 001',
            'joined_at': '2020-11-23',
            'retired_at': null,
            'contract_type': 'regular',
            'group':{
              'id': 'v7ld9eOqRydUXGLAErjZYB',
              'name': 'SI'
            }
         }
        ]
      };
    });

    res.writeHead(200);
  }
};
