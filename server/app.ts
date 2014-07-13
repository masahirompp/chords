/// <reference path='typings/tsd.d.ts' />

import express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

import index = require('routes/index');
import user = require('routes/user');
import song = require('routes/song');
import api = require('routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.cookieParser());

/// static
app.use(express.static(path.join(__dirname, 'public')));

/// route
app.use('/', index.index());
app.use('/user', user());
app.use('/song', song());
app.use('/api', api());

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err: Error = new Error('Not Found');
  res.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

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
