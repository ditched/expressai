module.exports = function(app, router) {
  var versions = {
    '/v1': require('./v1')
  };
  Object.keys(versions).forEach(function(version) {
    app.use(version, versions[version](router));
  });
  return app, router;
};
