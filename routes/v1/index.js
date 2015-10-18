module.exports = function(router) {
  var routes = {
    '/': {
      aliases: [''],
      handler: require('./test.js'),
      protocol: 'post'
    },
    '/bru': {
      aliases: ['/yo'],
      handler: require('./test.js'),
      protocol: 'get'
    }
  };
  Object.keys(routes).forEach(function(route) {
    routes[route].aliases.unshift('/' + route);
    router[routes[route].protocol](routes[route].aliases, routes[route].handler);
  });
  return router;
};
