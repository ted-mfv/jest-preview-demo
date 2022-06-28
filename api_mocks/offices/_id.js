module.exports = {
  methods: ['GET'],
  mock(proxyRes, req, res) {
    this.$utils.modifyResponse(res, proxyRes, function (body) {
      // document.cookie = 'billing_plan_name=ビジネス（トライアル）;path=/'
      // document.cookie = 'billing_contract_type=premium;path=/'  // or unpaid/trial/no_contract/support_group

      if (body && body.data) {
        const overwriteData = { ...(body.data || {}).billing };

        const plan_name = req.cookies.billing_plan_name;
        if (plan_name) Object.assign(overwriteData, { plan_name });

        const contract_type = req.cookies.billing_contract_type;
        if (contract_type) Object.assign(overwriteData, { contract_type });

        body.data = {
          ...body.data,
          billing: overwriteData
        };
      }
      return body;
    });
    return 200;
  }
};
