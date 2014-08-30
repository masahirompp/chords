'use strict';

var mongoose = require('mongoose');

exports.connect = function(db) {
  mongoose.connect('mongodb://' + db);
};

exports.debug = function(debug) {
  mongoose.set('debug', debug);
};

exports.Author = require('./models/author');
exports.Artist = require('./models/artist');
exports.Song = require('./models/song');
exports.Score = require('./models/score');
exports.Chord = require('./models/chord');

