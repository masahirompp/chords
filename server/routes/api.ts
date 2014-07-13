/// <reference path='../typings/tsd.d.ts' />

import express = require('express');

function api() {

  var router = new express.Router();

  router.get('/song/:artist/:song', function(req, res) {
    var query = req.query;
    if (query.artist && query.song) {

    }

    res.json(query);
  });

  router.get('/song/search');

  return router;
}
export = api;
