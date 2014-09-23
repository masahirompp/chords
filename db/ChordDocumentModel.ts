/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IChordDocument = require('IChordDocument');
import IChordDocumentModel = require('IChordDocumentModel');

var ChordSchema:mongoose.Schema = new mongoose.Schema({
  scoreId: {type: mongoose.Schema.Types.ObjectId, ref: 'Score', require: true},
  chords: {type: Array},
  option: {type: mongoose.Schema.Types.Mixed, require: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var ChordDocumentModel:IChordDocumentModel = <IChordDocumentModel> mongoose.model('Chord', ChordSchema);

ChordSchema.static('createNewChord',
  (scoreId:mongoose.Types.ObjectId, callback:(err:any, chord:IChordDocument)=>void) => {
    var chord = new ChordDocumentModel({
      scoreId: scoreId,
      chords: [],
      option: {}
    });
    chord.save(callback);
  });

export = ChordDocumentModel;
