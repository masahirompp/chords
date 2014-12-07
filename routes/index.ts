/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class Index {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * トップ画面
     * / GET
     */
    router.get('/', (req: express.Request, res: express.Response) => {
      res.render('index', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user,
        message_success:req.flash('message_success'),
        message_warning:req.flash('message_warning')
      });
    });

    /**
     * 検索結果一覧画面
     * /search GET
     */
    router.get('/search', (req: express.Request, res: express.Response) => {
      res.render('search', {
        title: req.query.q + 'の検索結果 | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * アーティストページ
     * /:artist
     */
    router.get('/:artist', (req: express.Request, res: express.Response) => {
      // TODO
    });

    /**
     * 曲ページ
     * /:artist/:song
     */
    router.get('/:artist/:song', (req: express.Request, res: express.Response) => {
      // TODO
    });

    /**
     * 譜面ページ
     * /:artist/:song/:score
     */
    router.get('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * ユーザページ
     * /users/:user
     */
    router.get('/users/:user', (req: express.Request, res: express.Response) => {
      // TODO
    });

    return router;
  }
}

export = Index;
