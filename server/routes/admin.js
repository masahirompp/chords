'use strict';

var express = require('express');
var router = express.Router();

/**
 * /api/admin
 */
router.get('/', function(req, res) {
  res.json({admin: '作成中も含めた一覧を表示'});
});

/**
 * /api/admin/:artist/:song POST NEW
 */
router.post('/:artist/:song', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song, method: 'new'});
});

/**
 * /api/admin/:artist/:song/:id POST EDIT
 */
router.post('/:artist/:song/:id', function(req, res) {
  var q = req.params;
  res.json({artist: q.artist, song: q.song, index: q.id, method: 'new'});
});

module.exports = router;
