(function () {
  'use strict';
  var express = require('express');
  var path = require('path');
  var favicon = require('static-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var index = require('./routes/index');
  var user = require('./routes/user');
  var song = require('./routes/song');
  var api = require('./routes/api');

  var app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', index);
  app.use('/user', user);
  app.use('/song', song);
  app.use('/api', api);

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  module.exports = app;
})();
(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.get('/song/:artist/:song', function (req, res) {
    var query = req.query;
    if (query.artist && query.song) {
    }

    res.json(query);
  });

  router.get('/song/search');

  module.exports = router;
})();
(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.get('/', function (req, res) {
    res.render('index.jade');
  });

  module.exports = router;
})();
(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var model = require(__dirname + '/../model');
  var Song = model.Song;

  router.get('/', function (req, res) {
    res.render('songlist.jade');
  });
  router.get('/list', function (req, res) {
    Song.find({}, function (err, result) {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        console.log('Success');
        res.json(result);
      }
    });
  });
  router.get('/:id', function (req, res) {
    Song.find({
      songID: req.params.id
    }, function (err, result) {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        console.log('Success: ' + result);
        res.json(result);
      }
    });
  });
  router.post('/', function (req, res) {
    res.send('new song');
  });
  router.put('/:id', function (req, res) {
    res.send('update ' + req.params.id);
  });
  router.delete('/:id', function (req, res) {
    res.send('delete ' + req.params.id);
  });

  module.exports = router;
})();
(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.get('/', function (req, res) {
    res.send('respond with a resource');
  });

  module.exports = router;
})();
