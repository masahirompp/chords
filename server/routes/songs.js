(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var model = require(__dirname + '/../model');
  var Song = model.Song;

  /* GET users listing. */
  router.get('/', function(req, res) {
    res.send('songs list');
  });
  router.get('/:id', function(req, res) {
    Song.find({
      songID: req.params.id
    }, function(err, result) {
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
  router.post('/', function(req, res) {
    res.send('new song');
  });
  router.put('/:id', function(req, res) {
    res.send('update ' + req.params.id);
  });
  router.delete('/:id', function(req, res) {
    res.send('delete ' + req.params.id);
  });

  module.exports = router;

})();
