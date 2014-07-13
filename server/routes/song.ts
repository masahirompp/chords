/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import model = require('../db/model');

function song() {

  var router = new express.Router();
  var Model = model.getIncetance();
  var Song = Model.createSong();

  /* GET users listing. */
  router.get('/', function(req, res) {

    // var testsong = new Song();
    // testsong.songID = '4';
    // testsong.name = 'test4';
    // testsong.save(function(err){
    //   console.log(err);
    // });

    res.render('songlist.jade');
  });
  router.get('/list', function(req, res) {
    Song.find({}, function(err, result) {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        console.log('Success');
        res.json(result);
      }
    });
  });
  router.get('/:id', function(req, res) {
    Song.find({
      songID: req.params.id
    }, function(err, result) {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        console.log('Success: ' + result);
        res.json(result);
      }
    });
  });
  router.post('/', function(req, res) {
    res.send('new song');
  });
  router.put('/:id', function(req, res) {
    res.send('update ' + req.params.id);
  });
  router.del('/:id', function(req, res) {
    res.send('delete ' + req.params.id);
  });

  return router;
}
export = song;
