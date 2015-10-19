module.exports = function(router) {
  var routes = {
    '/': {
      aliases: [''],
      handler: require('./test.js'),
      protocol: ['post', 'get']
    },
    '/lmao': {
      aliases: ['/lmfao'],
      handler: require('./test.js'),
      protocol: 'get'
    }
  };
  Object.keys(routes).forEach(function(route) {
    routes[route].aliases.unshift(route);
    if(typeof routes[route].protocol === "string") {
      router[routes[route].protocol](routes[route].aliases, routes[route].handler);
    } else {
      routes[route].protocol.forEach(function(protocol) {
        router[protocol](routes[route].aliases, routes[route].handler);
      });
    }
  });
  return router;
};
