/// <reference path='../typings/tsd.d.ts' />

import express = require('express');

function user() {

  var router = new express.Router();

  /* GET users listing. */
  router.get('/', function(req, res) {
    res.send('respond with a resource');
  });

  return router;

}
export = user;
