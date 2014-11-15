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
var log4js, logger, morgan;
if (config.log.writeFile) {
  log4js = require('log4js');
  log4js.configure('config/log4js_setting.json');
  logger = log4js.getLogger('app');
  logger.setLevel(config.log.level); // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
  logger.info('Logging start. ');
  logger.info('Log Level:' + config.log.level);
} else {
  morgan = require('morgan');
}

// app
var app = express();

// db setup
var db = require('./db/db');
db.debug(config.db.debug);
app.set('db', config.db.host + '/' + config.db.name);
db.connect(app.get('db'));

// passport
var passport = require('passport');
var TwitterStrategy = require('passport-twitter')
  .Strategy;
var User = require('./model/User');
passport.use(new TwitterStrategy({
    consumerKey: config.auth.twitter.TWITTER_CONSUMER_KEY,
    consumerSecret: config.auth.twitter.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth'
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(profile)
      .then(function(user) {
        done(null, user);
      })
      .catch(function(err) {
        done(err);
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// global
global.Q = require('q');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup
if (config.log.writeFile) {
  app.use(log4js.connectLogger(logger, {
    level: config.log.level
  }));
} else {
  app.use(morgan('dev'));
}
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
app.use('/api/admin', require('./routes/admin')
  .init());
app.use('/api', require('./routes/api')
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
