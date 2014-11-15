/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IChordDocument = require('IChordDocument');
import IChordDocumentModel = require('IChordDocumentModel');

var ChordSchema: mongoose.Schema = new mongoose.Schema({
  scoreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Score',
    require: true
  },
  chords: {
    type: Array
  },
  option: {
    type: mongoose.Schema.Types.Mixed,
    require: true
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

ChordSchema.static('createNewChord', (scoreId: mongoose.Types.ObjectId): Q.Promise < IChordDocument > => {

  var d = Q.defer < IChordDocument > ();

  var chord = new ChordDocumentModel({
    scoreId: scoreId,
    chords: [],
    option: {}
  });
  chord.save((err) => {
    err ? d.reject(err) : d.resolve(chord);
  });

  return d.promise;
});

var ChordDocumentModel: IChordDocumentModel = < IChordDocumentModel > mongoose.model('Chord', ChordSchema);

export = ChordDocumentModel;