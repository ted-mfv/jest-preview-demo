const { data } = require('./_sample_data.js');

module.exports = {
  delay: {
    req: 500, res: 1000
  },
  methods: ['GET'],
  mock(proxyRes, _req, res) {
    this.$utils.modifyResponse(res, proxyRes, () => ({ data }));
    return 200;
  }
};

