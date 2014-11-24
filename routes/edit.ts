/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class Edit {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * 編集画面表示
     */
    router.get('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * コード譜保存
     */
    router.post('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * コード譜削除
     */
    router.delete('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * 新規作成画面
     */
    router.get('/new', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    /**
     * 新規作成（初期保存）
     */
    router.post('/new', (req: express.Request, res: express.Response) => {
      res.render('score', {
        title: req.params.artist + ' ' + req.params.song + ' (' + req.params.id + ') | ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    return router;
  }
}

export = Edit;
