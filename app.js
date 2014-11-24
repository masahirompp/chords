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
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config');
var ECT = require('ect');

// global
global.Q = require('q');

// app
var app = express();
var logger = require('./util/Logger')
  .init(config, app);

// db setup
require('./db/db')
  .connect(config);

// auth
var passport = require('./util/AuthUtil')
  .init(config);

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
app.use(errorHandler());

// session auth
app.use(session({
  secret: config.server.session,
  store: new MongoStore({
    db: config.db.name,
    host: config.db.host,
    clear_interval: 60 * 60
  }),
  cookie: {
    httpOnly: false,
    maxAge: new Date(Date.now() + 60 * 60 * 1000)
  },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 認証領域へのアクセスで、匿名アクセスの場合、リダイレクト
app.use(function(req, res, next) {
  var url = req.url + '/';
  if (url.lastIndexOf('/mypage/', 0) === 0 || url.lastIndexOf('/edit/', 0) === 0) {
    if (req.isUnauthenticated()) {
      res.cookie('redirectUrl', req.url);
      return res.redirect('/auth/login');
    }
  }
  next();
});

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
