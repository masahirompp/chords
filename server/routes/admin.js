'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model');

/**
 * /api/admin GET LIST
 */
router.get('/', function(req, res) {
  res.json({admin: '作成中も含めた一覧を表示'});
});

/**
 * /api/admin POST NEW
 */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var title = req.body.title;
  var description = req.body.description;
  if(req.body.isOriginal) {
    model.Score.createNewOriginalScore('5402a919f68977bb2072b811', title, description, function(err, score) {
      if(err) {
        return next(err);
      }
      res.json(score);
    });
  } else {
    model.Score.createNewExistingScore('5402a919f68977bb2072b811',
      'artistid',
      'artistName',
      'songid',
      title,
      description,
      function(err, score) {
        if(err) {
          return next(err);
        }
        res.json(score);
      });
  }
});

/**
 * /api/admin/:artist/:song/:id POST EDIT
 */
router.post('/:artist/:song/:id', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song, index: q.id, method: 'new'});
});

module.exports = router;
