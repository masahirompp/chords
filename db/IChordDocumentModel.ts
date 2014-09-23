/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IChordDocument = require('IChordDocument');

interface IChordDocumentModel extends mongoose.Model<IChordDocument> {
  createNewChord:(scoreId:mongoose.Types.ObjectId,
                  callback:(err:any, chord:IChordDocument)=>void)=>void;
}

export = IChordDocumentModel;
