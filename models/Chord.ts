/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IChord extends mongoose.Document {
  scoreId: mongoose.Types.ObjectId
  chords: Array < Array < string >> ;
  option: any;
  created: Date;
  updated: Date;
}

var _schema = new mongoose.Schema({
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
  })
  .pre('save', function(next) {
    this.updated = new Date();
    next();
  });

var _model = mongoose.model < IChord > ('Chord', _schema);

class Chord {

  static findByScoreId(scoreId: string): Promise < Chord > {
    return new Promise < Chord > ((resolve, reject) => {
      _model.findOne({
          scoreId: scoreId
        })
        .exec()
        .onResolve((err, chord) => {
          err ? reject(err) : resolve(new Chord(chord));
        })
    })
  }

  static createNewChord(scoreId: mongoose.Types.ObjectId): Promise < Chord > {
    return new Promise < Chord > ((resolve, reject) => {
      _model.create({
          scoreId: scoreId,
          chords: [],
          option: {}
        })
        .onResolve((err, chord) => {
          err ? reject(err) : resolve(new Chord(chord));
        })
    });
  }

  private _chord: IChord;

  constructor(chord: IChord) {
    this._chord = chord;
  }

  get chords(): Array < Array < string >> {
    return this._chord.chords;
  }

  get option(): any {
    return this._chord.option;
  }
}

export = Chord