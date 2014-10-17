/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

var router:express.Router = express.Router();

/* GET home page. */
router.get('/', (req:express.Request, res:express.Response) => {
  res.sendFile('index.html', {root: './public'});
});

router.get('/:artist/:song/:id', (req:express.Request, res:express.Response) => {
  // TODO 存在チェック

  res.sendFile('score.html', {root: './public'});
});

router.get('/search', (req:express.Request, res:express.Response) => {
  res.sendFile('search.html', {root: './public'});
});

export = router;
