/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import Author = require('../model/Author');
import Score = require('../model/Score');
import ScoreDTO = require('../dto/_ScoreDTO');

class Api {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * /api/user/:id GET
     */
    router.get('/user/:id', (req: express.Request, res: express.Response) => {
      res.json({
        user: req.params.id
      });
    });

    /**
     * /api/user/:id POST
     */
    router.post('/user/:id', (req: express.Request, res: express.Response, next: Function) => {
      Author.createNewAuthor(req.params.id, '')
        .then((author: Author) => {
          res.json(author.json);
        })
        .catch((err) => {
          res.json(err);
        });
    });

    /**
     * /api/search POST
     */
    router.post('/search', (req: express.Request, res: express.Response, next: Function) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * /api/query POST
     */
    router.post('/query', (req: express.Request, res: express.Response, next: Function) => {
      Score.query(req.body.query)
        .then((scores: Score[]) => {
          res.json(Score.toJson(scores));
        })
        .catch(err => {
          res.json(err);
        });
    });

    /**
     * /api/:artist GET
     */
    router.get('/:artist', (req: express.Request, res: express.Response) => {
      var q = req.params;
      res.json({
        artist: q.artist
      });
    });

    /**
     * /api/:artist/:song GET
     */
    router.get('/:artist/:song', (req: express.Request, res: express.Response) => {
      var q = req.params;
      res.json({
        artist: q.artist,
        song: q.song
      });
    });

    /**
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
     * /api/error POST
     */
    router.post('/error', (req: express.Request, res: express.Response) => {
      console.log(req.params)
    });

    return router;
  }

}

module.exports = Api;