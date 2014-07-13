/// <reference path='typings/tsd.d.ts' />

import mongoose = require('mongoose');

(function() {
  'use strict';
  var uri = 'mongodb://localhost/chord';
  var db = mongoose.createConnection(uri, function(err) {
    if (err) {
      console.log('Error connected: ' + uri + ' - ' + err);
    } else {
      console.log('Success connected: ' + uri);
    }
  });

  var userSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: 'example@domain.ne.jp'
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  });
  userSchema.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  exports.User = db.model('User', userSchema);

  var artistSchema = new mongoose.Schema({
    artistID: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  });
  artistSchema.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  exports.Artist = db.model('Artist', artistSchema);

  var songSchema = new mongoose.Schema({
    songID: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    chords: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  });
  songSchema.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  exports.Song = db.model('Song', songSchema);
})();
