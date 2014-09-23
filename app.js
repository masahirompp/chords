'use strict';

var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

var db = require('./db/db');

var routes = require('./routes/index');
var api = require('./routes/api');
var admin = require('./routes/admin');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
  saveUninitialized: true,
  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
console.log('ENV: ' + app.get('env'));
if('development' === app.get('env')) {
  app.use(errorHandler());
}

//db setup
db.debug(true);
app.set('db', 'localhost/asdf');
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

module.exports = app;
