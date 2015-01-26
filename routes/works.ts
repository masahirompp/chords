/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class Works {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * マイページを表示
     */
    router.get('/', (req: express.Request, res: express.Response) => {
      res.render('works', {
        title: 'マイページ',
        user: req.user
      });
    });

    /**
     * プロフィールの編集画面表示
     */
    router.get('/profile', (req: express.Request, res: express.Response) => {
      // TODO
    });

    /**
     * プロフィールの保存
     */
    router.post('/profile', (req: express.Request, res: express.Response) => {
      // TODO
    });

    /**
     * 譜面編集画面
     */
    router.get('/:artist/:song/:score', (req: express.Request, res: express.Response) => {
      res.render('edit', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    return router;
  }
}

export = Works;
