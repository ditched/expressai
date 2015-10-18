var http = require('http'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    routes = require('./routes')(app, router),
    lib = require('./lib'),
    responses = lib.preResponse;

// Logging
app.use(function(req, res, next) {
  console.log(req.ip.replace(/^(::ffff:)/gi, '') + ' called route ' + req.path);
  next();
});

// Routing
app.use(routes);

// Error Handling
app.use(function(req, res, next) {
  res.status(404).send({error: responses.errors['invalid-endpoint']}).end();
});

// Setup Listener
(function(listener, app) {
  http.Server(app).listen(3000, function() {
    listener('HTTP/' + this.address().port);
  });
})(function(protocol) {
  console.log('%s server running', protocol);
}, app);
