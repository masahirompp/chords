'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Artist = new Schema({
  name: {type: String, require: true, unique: true},
  url: {type: String, require: true, unique: true},
  isOriginal: {type: Boolean, require: true},
  authorid: {type: ObjectId, ref: 'Author'},
  created: { type: Date, default: Date.now },
  updated: Date
});

Artist.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Artist.statics.createNewArtist = function(name, isOriginal, authorid, callback) {
  var artist = new this({name: name, url: name, isOriginal: isOriginal, authorid: authorid}); //TODO: URL convert.
  artist.save(callback);
};

module.exports = mongoose.model('Artist', Artist);
