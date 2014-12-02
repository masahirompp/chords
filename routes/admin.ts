/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import Score = require('../models/Score')

class Admin {

  static init(): express.Router {

    var router: express.Router = express.Router();

    /**
     * /api/admin GET LIST
     */
    router.get('/', (req: express.Request, res: express.Response) => {
      Score.query(req.body.query)
        .then(scores => res.json(scores.map(score => score.json)));
    });

    /**
     * /api/admin POST NEW
     */
    router.post('/', (req: express.Request, res: express.Response, next: Function) => {
      console.log(req.body);
      var songName: string = req.body.songName;
      var description: string = req.body.description;
      if (req.body.isOriginal) {
        Score.createNewOriginalScore('5402a919f68977bb2072b811', songName, description)
          .then((score: Score) => {
            res.json(score.json);
          })
          .catch((err) => next(err));
      } else {
        Score.createNewExistingScore('5402a919f68977bb2072b811',
            'artistId',
            'artistName',
            'songId',
            songName,
            description)
          .then((score: Score) => {
            res.json(score.json);
          })
          .catch((err) => next(err));
      }
    });

    /**
     * /api/admin/:artist/:song/:id POST EDIT
     */
    router.post('/:artist/:song/:id', (req: express.Request, res: express.Response) => {
      var q = req.params;
      res.json({
        artist: q.artist,
        song: q.song,
        index: q.id,
        method: 'new'
      });
    });

    return router;
  }
}

export = Admin;
