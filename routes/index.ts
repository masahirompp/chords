/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

var router: express.Router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {
    title: 'コード譜共有サイト ChordKitchen',
    keyword: ''
  });
});

router.get('/signin', (req: express.Request, res: express.Response) => {
  res.render('signin', {
    title: 'コード譜共有サイト ChordKitchen',
    keyword: ''
  });
});

router.get('/signup', (req: express.Request, res: express.Response) => {
  res.render('signup', {
    title: 'コード譜共有サイト ChordKitchen',
    keyword: ''
  });
});

router.get('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
  // TODO 存在チェック
  res.render('score', {
    title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
    keyword: ''
  });
});

router.get('/search', (req: express.Request, res: express.Response) => {
  res.render('search', {
    title: req.query.q + 'の検索結果 | ChordKitchen',
    keyword: ''
  });
});

export = router;
