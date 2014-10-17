/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IChordDocument extends mongoose.Document {
  scoreId: mongoose.Types.ObjectId
  chords: Array<Array<string>>;
  option: any;
  created: Date;
  updated: Date;
}

export = IChordDocument;
