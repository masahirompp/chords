'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('songs list');
});
router.get('/:id', function(req, res) {
  res.send('song id is ' + req.params.id);
});
router.post('/', function(req, res) {
  res.send('new song');
});
router.put('/:id', function(req, res) {
  res.send('update ' + req.params.id);
});
router.delete('/:id', function(req, res) {
  res.send('delete ' + req.params.id);
});

module.exports = router;
