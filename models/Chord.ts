/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import BaseModel = require('./BaseModel');
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
    settings: {
      key: String,
      musicalTime: String
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

interface IChord extends mongoose.Document, Chord {}

var _model = mongoose.model < IChord > ('Chord', _schema);

class Chord extends BaseModel {
  chords: Array < Array < string >> ;
  settings: any;

  /**
   * コンストラクタ
   * @param chord
   */
  constructor(chord: IChord) {
    super();
    if (chord) {
      util.extend(this, chord.toObject());
    }
  }

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

    static createNewChord(scoreId: mongoose.Types.ObjectId, key: string, musicalTime: string): Promise < Chord > {
    return new Promise < Chord > ((resolve, reject) => {
      _model.create({
          scoreId: scoreId,
          chords: [],
          settings: {
            key: key,
            musicalTime: musicalTime
          }
        })
        .onResolve((err, chord) => {
          err ? reject(err) : resolve(new Chord(chord));
        })
    });
  }
}

export = Chord