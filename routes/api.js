'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db');

/**
 * /api/user/:id GET
 */
router.get('/user/:id', function(req, res) {
  res.json({user: req.params.id});
});

/**
 * /api/user/:id POST
 */
router.post('/user/:id', function(req, res, next) {
  db.Author.createAuthor(req.params.id, '', function(err, author) {
    if(err) {
      return next(err);
    }
    res.json(author);
  });
});

/**
 * /api/search POST
 */
router.post('/search', function(req, res) {
  res.json({search: 'search'});
});

/**
 * /api/:artist GET
 */
router.get('/:artist', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist});
});

/**
 * /api/:artist/:song GET
 */
router.get('/:artist/:song', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song});
});

/**
 * /api/:artist/:song/:id GET
 */
router.get('/:artist/:song/:id', function(req, res, next) {
  var q = req.params;
  db.Score.where({
    artistName: q.artist,
    title: q.song,
    scoreid: q.id + ''
  }).findOne(function(err, score) {
    if(err) {
      return next(err);
    }
    db.Chord.where({scoreid: score.scoreid}).findOne(function(err, chord) {
      if(err) {
        return next(err);
      }
      res.json({
        success: true,
        messages: [],
        data: {
          info: score,
          chords: chord.chords,
          option: chord.option
        }
      });
    });
  });
});

module.exports = router;
