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

  return Q.promise < IChordDocument > ((resolve, reject) => {
    ChordDocumentModel.create({
        scoreId: scoreId,
        chords: [],
        option: {}
      })
      .onFulfill(chords => {
        resolve(chords[0]);
      })
      .onReject(err => {
        reject(err);
      })
  });

});

var ChordDocumentModel: IChordDocumentModel = < IChordDocumentModel > mongoose.model('Chord', ChordSchema);

export = ChordDocumentModel;