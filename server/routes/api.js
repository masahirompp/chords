'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db');
//var model = require('../model');

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
router.get('/:artist/:song/:id', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song, index: q.id});
});

module.exports = router;
