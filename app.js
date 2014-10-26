'use strict';

// middleware
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

// app
var db = require('./db/db');
var config = require('config');
var routes = require('./routes/index');
var api = require('./routes/api');
var admin = require('./routes/admin');

// global
global.Q = require('q');

// Logger
var log4js = require('log4js');
log4js.configure('config/log4js_setting.json');
var logger = log4js.getLogger('app');
logger.setLevel(config.log.level); // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
logger.info('Logging start. ');
logger.info('Log Level:' + config.log.level);

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup
app.use(log4js.connectLogger(logger, {
  level: config.log.level
}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.server.session
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler());

//db setup
db.debug(config.db.debug);
app.set('db', config.db.host + '/' + config.db.name);
db.connect(app.get('db'));

app.use('/', routes);
app.use('/api/admin', admin);
app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(config.server.port, function() {
  logger.info('Express server listening on port ' + server.address()
    .port);
});
