/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class MyPage {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * マイページを表示
     */
    router.get('/', (req: express.Request, res: express.Response) => {
      res.render('mypage', {
        title: 'マイページ',
        user: req.user
      });
    });

    /**
     * プロフィールの編集画面表示
     */
    router.get('/profile', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: 'マイページ',
        user: req.user
      });
    });

    /**
     * プロフィールの保存
     */
    router.post('/profile', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: 'マイページ',
        user: req.user
      });
    });

    /**
     * 自分が作成した曲の一覧
     */
    router.get('/songs', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: 'マイページ',
        user: req.user
      });
    });

    return router;
  }
}

export = MyPage;
