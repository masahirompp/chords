'use strict';

// middleware
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var errorHandler = require('errorhandler');
var config = require('config');
var ECT = require('ect');

// db setup
require('./db/db')
  .connect(config);

// global
global.Q = require('q');

// app
var app = express();
var logger = require('./util/Logger')
  .init(config, app);

var ectRenderer = ECT({
  watch: true,
  root: __dirname + '/views',
  ext: '.ect'
});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// setup
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(errorHandler());

// auth
var passport = require('./util/AuthUtil')
  .init(config, app);

// route
app.use('/auth', require('./routes/auth')
  .init(passport));
app.use('/api/admin', require('./routes/admin')
  .init());
app.use('/api', require('./routes/api')
  .init());
app.use('/mypage', require('./routes/mypage')
  .init());
app.use('/edit', require('./routes/edit')
  .init());
app.use('/', require('./routes/index')
  .init());

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

// start
var server = app.listen(config.server.port, function() {
  if (config.log.writeFile) {
    logger.info('Express server listening on port ' + server.address()
      .port);
  }
});
