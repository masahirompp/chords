/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IScoreDocument extends mongoose.Document {
  url: string;
  scoreNo: number;
  description: string;
  artistId: string;
  artistName: string;
  isOriginal: boolean;
  songId: string;
  songName: string;
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  star: number
  isPublish: boolean
  created: Date;
  updated: Date;
}

export = IScoreDocument;
