'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', {root: './public'});
});

router.get('/:artist/:song/:id', function(req, res) {
  // TODO 存在チェック

  res.sendFile('score.html', {root: './public'});
});

module.exports = router;
