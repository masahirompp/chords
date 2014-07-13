/// <reference path='../typings/tsd.d.ts' />

import express = require('express');

function index() {

  var router = new express.Router();
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index.jade');
  });
  return router;
}
export = index;
