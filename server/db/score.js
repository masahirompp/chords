'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Score = new Schema({
  url: {type: String, require: true, unique: true},
  description: {type: String, require: true},
  artistid: String,
  artistName: {type: String, require: true},
  isOriginal: {type: Boolean, require: true},
  songid: String,
  title: {type: String, require: true},
  authorid: {type: ObjectId, ref: 'Author'},
  authorName: {type: String, require: true},
  star: {type: Number, default: 0},
  isPublish: {type: Boolean, require: true},
  created: { type: Date, default: Date.now },
  updated: Date
});

Score.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Score.statics.createNewSong = function(url,
  description,
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
    url: url,
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
