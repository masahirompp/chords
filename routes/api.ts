/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import Author = require('../models/Author');
import Score = require('../models/Score');
import ScoreDTO = require('../dto/_ScoreDTO');

class Api {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * ユーザ一覧
     * /api/users GET
     */
    router.get('/users', (req: express.Request, res: express.Response) => {
      res.json({
        user: req.params.id
      });
    });

    /**
     * ユーザ検索
     * /api/users/search GET
     */
    router.get('/users/search', (req: express.Request, res: express.Response) => {
      res.json({
        user: req.params.id
      });
    });

    /**
     * ユーザ取得
     * /api/users/:user GET
     */
    router.get('/users/:user', (req: express.Request, res: express.Response) => {
      res.json({
        user: req.params.user
      });
    });

    /**
     * 対象ユーザの譜面位置一覧取得
     * /api/users/:user/scores GET
     */
    router.get('/users/:user/scores', (req: express.Request, res: express.Response) => {
      res.json({
        user: req.params.user
      });
    });

    /**
     * 公開中の楽譜一覧取得
     * /api/scores GET
     */
    router.get('/scores', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * 譜面検索
     * /api/scores/search GET
     */
    router.get('/scores/search', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * アーティストの譜面一覧
     * /api/scores/:artist
     */
    router.get('/scores/:artist', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * アーティストの曲の譜面一覧
     * /api/scores/:artist/:song
     */
    router.get('/scores/:artist/:song', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * 譜面取得
     * /api/:artist/:song/:id GET
     */
    router.get('/:artist/:song/:id', (req: express.Request, res: express.Response, next: Function) => {
      var q = req.params;

      console.log(q);

      Score.find(q.artist, q.song, q.id)
        .then((score: Score) => {
          res.json(score.json);
        })
        .catch(err => {
          if (err.message === 'not found.') {
            res.status(404);
            res.json({
              message: 'このコード譜は見つかりません。'
            });
          } else {
            res.status(500);
            res.json({
              message: '大変申し訳ありません。システムエラーが発生しました。時間を空けて再度お試しください。それでも解決しない場合は、お問い合わせください。'
            });
          }
        });
    });

    /**
     * 自分の譜面一覧（下書き含む）
     * /api/works
     */
    router.get('/works', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * 譜面新規作成
     * /api/works
     */
    router.post('/works', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * 譜面表示（下書き含む）
     * /api/works/:artist/:song/:score
     */
    router.get('/works/:artist/:song/:score', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * 譜面保存（下書き含む）
     * /api/works/:artist/:song/:score
     */
    router.post('/works/:artist/:song/:score', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * /api/error POST
     */
    router.post('/error', (req: express.Request, res: express.Response) => {
      console.log(req.params)
    });

    return router;
  }

}

module.exports = Api;
