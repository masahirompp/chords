'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Chord = new Schema({
  scoreid: {type: ObjectId, ref: 'Score', require: true},
  chords: {type: Array},
  option: {type: Schema.Types.Mixed, require: true},
  created: { type: Date, default: Date.now },
  updated: Date
});

// 保存前に現在時刻を挿入
Chord.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Chord.statics.createNewChord = function(scoreid, chords, option, callback) {
  var chord = new this({
    scoreid: scoreid + 0,
    chords: chords,
    option: option
  });
  chord.save(callback);
};

module.exports = mongoose.model('Chord', Chord);
