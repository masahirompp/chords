'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var option = new Schema({
  staffSpace: { type: Number, default: 20},
  lineSpace: { type: Number, default: 2},
  underlineSpace: { type: Number, default: 2},
  hasPageNo: { type: Boolean, default: true},
  staffType: { type: String, default: 'staff'},
  barCount: { type: Number, default: 4},
  musicalTime: { type: Number, default: 8},
  hasClef: { type: Boolean, default: true},
  clef: { type: String, default: 'gClef'},
  hasKey: { type: Boolean, default: false},
  hasBarNo: { type: Boolean, default: false}
});

var Chord = new Schema({
  scoreid: {type: ObjectId, ref: 'Score', require: true},
  chords: {type: Array},
  option: {type: [option], require: true},
  created: { type: Date, default: Date.now },
  updated: Date
});

// 保存前に現在時刻を挿入
Chord.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Chord.statics.createNewSong = function(scoreid, chords, option, callback) {
  var chord = new this({
    scoreid: scoreid,
    chords: chords,
    option: option
  });
  chord.save(callback);
};

module.exports = mongoose.model('Chord', Chord);
