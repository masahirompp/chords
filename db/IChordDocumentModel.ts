/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IChordDocument = require('IChordDocument');

interface IChordDocumentModel extends mongoose.Model<IChordDocument> {
  createNewChord:(scoreId:mongoose.Types.ObjectId) => Q.Promise<IChordDocument>;
}

export = IChordDocumentModel;
