'use strict';
var db = require('../db');
var model = require('../model');
var _ = require('underscore');
var CONST = {
  ORIGINAL: true,
  EXISTING: false,
  STAR_DEFAULT: 0,
  DRAFT: false
};

var generateScoreUrl = function(artistName, title, callback) {
  db.Score.find({artistName: artistName, title: title}, 'url', function(err, urls) {
    if(err) {
      return callback(err);
    }
    var scoreID = _.chain(urls).map(function(url) {
      return Number(url.substring(url.lastIndexOf('/') + 1));
    }).max() + 1;
    callback(null, '/' + artistName + '/' + title + '/' + scoreID);
  });
};

var Score = function(scoreDoc) {
  this.score = scoreDoc;
};

Score.createNewOriginalScore = function(authorid, title, description, callback) {

  model.Author.getById(authorid, function(err, author) {
    if(err) {
      return callback(err);
    }
    generateScoreUrl(author.name, title, function(err, url) {
      if(err) {
        return callback(err);
      }
      db.Score.createNewScore(url,
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
          callback(err, new Score(scoreDoc));
        });
    });
  });

};

Score.createNewExistingScore = function(authorid, artistid, artistName, songid, title, description, callback) {
  model.Author.getById(authorid, function(err, author) {
    if(err) {
      return callback(err);
    }
    generateScoreUrl(artistName, title, function(err, url) {
      if(err) {
        return callback(err);
      }
      db.Score.createNewScore(url,
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
          callback(err, new Score(scoreDoc));
        });
    });
  });
};

module.exports = Score;
