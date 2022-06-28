module.exports = {
  methods: ['GET'],
  mock(proxyRes, _req, res) {
    const { modifyResponse, shuffleArray } = this.$utils;
    modifyResponse(res, proxyRes, function (body) {
      if (body && body.data) {
        if (Array.isArray(body.data)) {
          // body.data.forEach(d => { d.accessible = false });
          shuffleArray(body.data);
        }
      }
      return body;
    });
    return 200;
  }
};
