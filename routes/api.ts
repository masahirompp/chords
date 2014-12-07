/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import Author = require('../models/Author');
import Score = require('../models/Score');
import ScoreDTO = require('../dto/_ScoreDTO');
import Util = require('../util/Util');

class Api {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * ユーザ一覧
     * /api/users GET
     */
    router.get('/users', (req: express.Request, res: express.Response) => {
      Author.list(Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(authors => {
          return Promise.all(authors.map(a => a.gerRelatedUsers()));
        })
        .then(authorList => res.json(authorList.map(a => Util.project(a, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * ユーザ検索
     * /api/users/search GET
     */
    router.get('/users/search', (req: express.Request, res: express.Response) => {
      Author.search(req.query.q, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(authors => {
          return Promise.all(authors.map(a => a.gerRelatedUsers()));
        })
        .then(authorList => res.json(authorList.map(a => Util.project(a, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * ユーザ取得
     * /api/users/:user GET
     */
    router.get('/users/:user', (req: express.Request, res: express.Response) => {
      Author.findByAccountId(req.params.user)
        .then(author => res.json(Util.project(author.json, req.query.fields)))
        .catch(err => res.json(err));
    });

    /**
     * 対象ユーザの譜面位置一覧取得
     * /api/users/:user/scores GET
     */
    router.get('/users/:user/scores', (req: express.Request, res: express.Response) => {
      Score.findByAuthor(req.params.user, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * 公開中の楽譜一覧取得
     * /api/scores GET
     */
    router.get('/scores', (req: express.Request, res: express.Response) => {
      Score.list(Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * 公開中の譜面検索
     * /api/scores/search GET
     */
    router.get('/scores/search', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * アーティストの譜面一覧
     * /api/scores/:artist
     */
    router.get('/scores/:artist', (req: express.Request, res: express.Response) => {
      Score.findByArtist(req.params.artist, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * 対象曲の譜面一覧
     * /api/scores/:artist/:song
     */
    router.get('/scores/:artist/:song', (req: express.Request, res: express.Response) => {
      Score.findBySong(req.params.artist, req.params.song, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * 譜面取得
     * /api/:artist/:song/:id GET
     */
    router.get('/:artist/:song/:id', (req: express.Request, res: express.Response, next: Function) => {
      Score.find(req.params.artist, req.params.song, Util.toNumber(req.params.id))
        .then(score => {
          if (!score.isValid) throw new Error('この楽譜は存在しません。');
          if (!score.isPublish) throw new Error('この楽譜は非公開です。');
          return score.jsonWithChord
        })
        .then(json => res.json(Util.project(json, req.query.fields)))
        .catch(err => res.json(err));
    });

    /**
     * 自分の譜面一覧（下書き含む）
     * /api/works
     */
    router.get('/works', (req: express.Request, res: express.Response) => {
      Score.findMyWorks(req.user.authorId, Util.toNumber(req.query.skip), Util.toNumber(req.query.limit))
        .then(scores => res.json(scores.map(score => Util.project(score.json, req.query.fields))))
        .catch(err => res.json(err));
    });

    /**
     * 譜面新規作成
     * /api/works
     */
    router.post('/works', (req: express.Request, res: express.Response) => {
      Score.search(req.body.keyword)
        .then((scores: Score[]) => {
          res.json(scores.map(u => u.json));
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
          res.json(scores.map(u => u.json));
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
      Score.find(req.params.artist, req.params.song, Util.toNumber(req.params.id))
        .then(score => score.jsonWithChord())
        .then(json => res.json(Util.project(json, req.query.fields)))
        .catch(err => res.json(err));
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