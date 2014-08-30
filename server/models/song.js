'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Song = new Schema({
  title: {type: String, require: true}, //アーティスト内でのタイトル重複チェックはアプリで行う。
  artistid: {type: ObjectId, ref: 'Artist', require: true},
  created: { type: Date, default: Date.now },
  updated: Date
});

Song.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Song.statics.createNewSong = function(title, artistid, callback) {
  var song = new this({title: title, artistid: artistid});
  song.save(callback);
};

module.exports = mongoose.model('Song', Song);
