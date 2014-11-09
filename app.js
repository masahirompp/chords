'use strict';

// middleware
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config');

// Logger
var log4js = require('log4js');
log4js.configure('config/log4js_setting.json');
var logger = log4js.getLogger('app');
logger.setLevel(config.log.level); // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
logger.info('Logging start. ');
logger.info('Log Level:' + config.log.level);

// app
var app = express();

// db setup
var db = require('./db/db');
db.debug(config.db.debug);
app.set('db', config.db.host + '/' + config.db.name);
db.connect(app.get('db'));

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local')
  .Strategy;
//var passportTwitter = require('passport-twitter').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.verifyPassword(password, function(err, result) {
        if (err) {
          return done(err);
        }
        return result ? done(null, user) : done(null, false);
      });
    });
  }
));

// route
var routes = require('./routes/index');
var api = require('./routes/api');
var admin = require('./routes/admin');

// global
global.Q = require('q');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup
app.use(log4js.connectLogger(logger, {
  level: config.log.level
}));
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
    host: config.db.host
  }),
  cookie: {
    httpOnly: false
  },
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// route
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

// start
var server = app.listen(config.server.port, function() {
  logger.info('Express server listening on port ' + server.address()
    .port);
});