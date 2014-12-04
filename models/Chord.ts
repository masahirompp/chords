/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IChord extends mongoose.Document {
  scoreId: mongoose.Types.ObjectId
  chords: Array < Array < string >> ;
  option: any;
  created: Date;
  updated: Date;
}

class Chord {

  private static _schema = new mongoose.Schema({
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

  private static _model = mongoose.model<IChord>('Chord', Chord._schema);

  static createNewChord(scoreId: mongoose.Types.ObjectId): Promise < Chord > {

    return new Promise < Chord > ((resolve, reject) => {
      this._model.create({
          scoreId: scoreId,
          chords: [],
          option: {}
        })
        .onFulfill(chord => {
          resolve(new Chord(chord));
        })
        .onReject(err => {
          reject(err);
        })
    });

  }

  private _chord: IChord;

  constructor(chord: IChord) {
    this._chord = chord;
  }

}

export = Chord
