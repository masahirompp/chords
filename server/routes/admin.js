'use strict';

var express = require('express');
var router = express.Router();
//var model = require('../model');

/**
 * /api/admin GET LIST
 */
router.get('/', function(req, res) {
  res.json({admin: '作成中も含めた一覧を表示'});
});

/**
 * /api/admin/ POST NEW
 */
router.post('/', function(req, res) {
  var artistUrl = req.query.artist;
  var songUrl = req.query.song;
  res.json({artist: artistUrl, song: songUrl, method: 'new'});
});

/**
 * /api/admin/:artist/:song/:id POST EDIT
 */
router.post('/:artist/:song/:id', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song, index: q.id, method: 'new'});
});

module.exports = router;
