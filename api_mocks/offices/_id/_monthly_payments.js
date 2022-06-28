const now = new Date();
const meta = { total_count: 125 };
const histories = new Array(meta.total_count).fill(0).map((_item, i) => {
  now.setMonth(now.getMonth() - 1);
  return {
    id: `${i}`,
    month: `${now.getFullYear()}-${now.getMonth()+1}`,
    billed_employees_number: Math.floor(Math.random() * 95001) + 500,
    monthly_fee: 10000
  };
});

module.exports = {
  methods: ['GET'],
  mock(proxyRes, req, res) {
    this.$utils.modifyResponse(res, proxyRes, function () {
      const page = (/\?page=(\d+)&/.exec(req.url) || [])[1];
      const p = parseInt(page, 10) || 1;
      return {
        meta,
        data: histories.slice(50 * (p - 1), 50 * p)
      };
    });

    res.writeHead(200);
  }
};
