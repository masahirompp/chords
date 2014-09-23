/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

var router:express.Router = express.Router();

/* GET home page. */
router.get('/', function(req:express.Request, res:express.Response) {
  res.sendFile('index.html', {root: './public'});
});

router.get('/:artist/:song/:id', function(req:express.Request, res:express.Response) {
  // TODO 存在チェック

  res.sendFile('score.html', {root: './public'});
});

export = router;
