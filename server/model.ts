/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/express/express.d.ts' />
/// <reference path='typings/mongoose/mongoose.d.ts' />

(function() {
  'use strict';
  var mongoose = require('mongoose');
  var uri : string = 'mongodb://localhost/chord';
  var db = mongoose.createConnection(uri, function(err) {
    if (err) {
      console.log('Error connected: ' + uri + ' - ' + err);
    } else {
      console.log('Success connected: ' + uri);
    }
  });
  var Schema = mongoose.Schema;

  // define
  var User = new Schema({
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
  User.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  User = db.model('User', User);

  var Artist = new Schema({
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
  Artist.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  Artist = db.model('Artist', Artist);

  var Song = new Schema({
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
      type: [Schema.Types.Mixed],
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
  Song.pre('save', function(next) {
    this.updated = new Date();
    next();
  });
  exports.Song = db.model('Song', Song);

})();
