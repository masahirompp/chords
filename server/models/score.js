'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Score = new Schema({
  description: {type: String, require: true},
  artistid: {type: ObjectId, ref: 'Artist'},
  artistName: {type: String, require: true},
  isOriginal: {type: Boolean, require: true},
  songid: {type: ObjectId, ref: 'Chords'},
  title: {type: String, require: true},
  authorid: {type: ObjectId, ref: 'Author'},
  authorName: {type: String, require: true},
  star: {type: Number, default: 0},
  isPublish: {type: Boolean, require: true},
  created: { type: Date, default: Date.now },
  updated: Date
});

// 保存前に現在時刻を挿入
Score.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Score.statics.createNewSong = function(description,
  artistid,
  artistName,
  isOriginal,
  songid,
  title,
  authorid,
  authorName,
  star,
  isPublish,
  callback) {
  var score = new this({
    description: description,
    artistid: artistid,
    artistName: artistName,
    isOriginal: isOriginal,
    title: title,
    authorid: authorid,
    authorName: authorName,
    star: star,
    isPublish: isPublish
  });
  score.save(callback);
};

module.exports = mongoose.model('Score', Score);