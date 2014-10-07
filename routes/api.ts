/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
import Author = require('../model/Author');
import Score = require('../model/Score');

var router:express.Router = express.Router();

/**
 * /api/user/:id GET
 */
router.get('/user/:id', (req:express.Request, res:express.Response) => {
  res.json({user: req.params.id});
});

/**
 * /api/user/:id POST
 */
router.post('/user/:id', (req:express.Request, res:express.Response, next:Function) => {
  Author.createNewAuthor(req.params.id, '').then((author:Author) => {
    res.json(author.json);
  }).catch((err) => {
    next(err);
  });
});

/**
 * /api/search POST
 */
router.post('/search', (req:express.Request, res:express.Response) => {
  res.json({search: 'search'});
});

/**
 * /api/:artist GET
 */
router.get('/:artist', (req:express.Request, res:express.Response) => {
  var q = req.params;
  res.json({artist: q.artist});
});

/**
 * /api/:artist/:song GET
 */
router.get('/:artist/:song', (req:express.Request, res:express.Response) => {
  var q = req.params;
  res.json({artist: q.artist, song: q.song});
});

/**
 * /api/:artist/:song/:id GET
 */
router.get('/:artist/:song/:id', (req:express.Request, res:express.Response, next:Function) => {
  var q = req.params;
  Score.find(q.artist, q.song, q.id)
    .then((score:Score) => {
      res.json(score.json);
    })
    .catch((err)=> {
      console.dir(err);
    });
});

module.exports = router;
