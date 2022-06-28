module.exports = {
  delay: 1000,
  methods: ['PATCH'],
  mock(proxyRes, req, res) {
    this.$utils.modifyResponse(res, proxyRes, function () {
      const id = req.url.split('/').pop();
      const { application_forms = []} = req.body || {};
      return {
        data: {
          id,
          group_id: 'pVQmX2Go4QbUk6PJvOEjkB',
          status: 'incomplete',
          application_forms: application_forms.map(af => ({
            ...af,
            is_completed: !!af.is_completed
          }))
        }
       };
    });

    return 200;
  }
};
