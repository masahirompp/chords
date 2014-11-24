/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class Index {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /* GET home page. */
    router.get('/', (req: express.Request, res: express.Response) => {
      res.render('index', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user,
        message_success:req.flash('message_success'),
        message_warning:req.flash('message_warning')
      });
    });

    router.get('/search', (req: express.Request, res: express.Response) => {
      res.render('search', {
        title: req.query.q + 'の検索結果 | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    router.get('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      // TODO 存在チェック
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    return router;
  }
}

export = Index;
