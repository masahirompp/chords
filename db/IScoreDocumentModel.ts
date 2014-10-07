/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IScoreDocument = require('IScoreDocument');

interface IScoreDocumentModel extends mongoose.Model<IScoreDocument> {
  createNewScore:(scoreNo:number,
                  description:string,
                  artistId:string,
                  artistName:string,
                  isOriginal:boolean,
                  songId:string,
                  songName:string,
                  authorId:mongoose.Types.ObjectId,
                  authorName:string) => Q.Promise<IScoreDocument>;
}

export = IScoreDocumentModel;
