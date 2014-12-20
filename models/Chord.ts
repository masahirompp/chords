/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import util = require('../util/Util');

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

var _model = mongoose.model('Chord', _schema);

class Chord {
  scoreId: mongoose.Types.ObjectId;
  chords: Array < Array < string >> ;
  option: any;
  private created: Date;
  private updated: Date;

  constructor(chord: any) {
    util.extend(this, chord);
  }

  static findByScoreId(scoreId: string): Promise < Chord > {
    return new Promise < Chord > ((resolve, reject) => {
      _model.findOne({
        scoreId: scoreId
      })
        .exec()
        .onResolve((err, chord) => {
          err ? reject(err) : resolve(new Chord(chord.toObject()));
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
          err ? reject(err) : resolve(new Chord(chord.toObject()));
        })
    });
  }
}

export = Chord
