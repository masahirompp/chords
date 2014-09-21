'use strict';
var db = require('../db');
var model = require('../model');
var Q = require('q');
var _ = require('underscore');
var CONST = {
  ORIGINAL: true,
  EXISTING: false,
  STAR_DEFAULT: 0,
  DRAFT: false
};

var generateScoreId = function(artistName, title, callback) {
  db.Score.find({artistName: artistName, title: title}, 'url', function(err, results) {
    if(err) {
      return callback(err);
    }
    if(results.length === 0) {
      return callback(null, 1);
    }
    console.dir(results);
    var maxScoreId = _.chain(results).map(function(result) {
      return Number(result.url.substring(result.url.lastIndexOf('/') + 1));
    }).max().value();
    callback(null, maxScoreId + 1);
  });
};

var Score = function(scoreDoc, chordDoc) {
  this.score = scoreDoc;
  this.chord = chordDoc;
};

Score.createNewOriginalScore = function(authorid, title, description, callback) {

  model.Author.getById(authorid, function(err, author) {
    if(err) {
      return callback(err);
    }
    generateScoreId(author.name, title, function(err, scoreid) {
      if(err) {
        return callback(err);
      }
      db.Score.createNewScore('/' + author.name + '/' + title + '/' + scoreid,
        scoreid,
        description,
        authorid,
        author.name,
        CONST.ORIGINAL,
        title,
        title,
        authorid,
        author.name,
        CONST.STAR_DEFAULT,
        CONST.DRAFT,
        function(err, scoreDoc) {
          if(err) {
            return callback(err);
          }
          db.Chord.createNewChord(scoreid, [], {}, function(err, chordDoc) {
            callback(err, new Score(scoreDoc, chordDoc));
          });
        });
    });
  });

};

Score.createNewExistingScore = function(authorid, artistid, artistName, songid, title, description, callback) {
  model.Author.getById(authorid, function(err, author) {
    if(err) {
      return callback(err);
    }
    generateScoreId(artistName, title, function(err, scoreid) {
      if(err) {
        return callback(err);
      }
      db.Score.createNewScore('/' + artistName + '/' + title + '/' + scoreid,
        description,
        artistid,
        artistName,
        CONST.EXISTING,
        songid,
        title,
        authorid,
        author.name,
        CONST.STAR_DEFAULT,
        CONST.DRAFT,
        function(err, scoreDoc) {
          if(err) {
            callback(err);
          }
          db.Chord.createNewChord(scoreid, [], {}, function(err, chordDoc) {
            callback(err, new Score(scoreDoc, chordDoc));
          });
        });
    });
  });
};

module.exports = Score;
