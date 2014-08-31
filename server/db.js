'use strict';

var mongoose = require('mongoose');

exports.connect = function(db) {
  mongoose.connect('mongodb://' + db);
};

exports.debug = function(debug) {
  mongoose.set('debug', debug);
};

exports.Author = require('./db/author');
exports.Score = require('./db/score');
exports.Chord = require('./db/chord');

