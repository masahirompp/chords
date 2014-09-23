/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');

interface IChordDocument extends mongoose.Document {
  scoreId: mongoose.Types.ObjectId
  chords: string[][];
  option: any;
  created: Date;
  updated: Date;
}

export = IChordDocument;
