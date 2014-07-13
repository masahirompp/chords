/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/express/express.d.ts' />

(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.get('/song/:artist/:song', function (req, res) {
    var query = req.query;
    if (query.artist && query.song) {

    }

    res.json(query);
  });

  router.get('/song/search');

  module.exports = router;

})();
