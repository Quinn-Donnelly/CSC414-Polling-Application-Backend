'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var app = module.exports = loopback();

app.use(cookieParser());
app.use(bodyParser.json());
// Look for accessToken in the route and in cookie
app.use(loopback.token({
  model: app.model.accessToken,
}));

app.get('*', (req, res, next) => {
  if (!req.accessToken) {
    req.accessToken = req.cookies;
  }
  next();
});

app.post('/api/classrooms', (req, res, next) => {
  req.body['shortid'] = shortid.generate();
  console.log(req.body);
  next();
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
