const RACER_REPORT_PROGRESS = 'racer_report_progress';

module.exports = {
  delay: 2000,
  methods: ['POST', 'GET', 'PATCH'],
  mock(proxyRes, req, res) {
    const racerReportProgress = req.cookies[RACER_REPORT_PROGRESS] || '';
    // memo: res.cookie should be called before modify response
    if (['POST', 'PATCH'].indexOf(req.method) !== -1) {
      res.cookie(RACER_REPORT_PROGRESS, '-');
    } else if (racerReportProgress && racerReportProgress.length < 3) {
      res.cookie(RACER_REPORT_PROGRESS, `${racerReportProgress}-`);
    } else {
      res.clearCookie(RACER_REPORT_PROGRESS);
    }

    this.$utils.modifyResponse(res, proxyRes, function () {
      if (['POST', 'PATCH'].indexOf(req.method) !== -1) return {};

      if (racerReportProgress && racerReportProgress.length < 3) return {
        data: { file_name_url: null, is_failed: false }
      };

      // if (!creating) {
      //   // simulate the case that racer's not created;
      //   if (count === 0 && Math.random() > 0.5) return null;
      // }

      const is_failed = Math.random() > 0.8;
      const formID = req.url.split('/application_forms/').pop().split('/').shift();
      const updated_at = new Date().toISOString();
      const data = {
        is_failed,
        id: is_failed ? null : `${formID}__${updated_at.split(':').join('')}`,
        updated_at: is_failed ? null : updated_at,
        file_name_url: is_failed ? null : req.url,
      };

      return { data };
    });

    return 200;
  }
};
