/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IScoreDocument = require('IScoreDocument');
import IScoreDocumentModel = require('IScoreDocumentModel');
import UriUtil = require('../util/uriUtil');

var ScoreSchema:mongoose.Schema = new mongoose.Schema({
  url: {type: String, require: true, unique: true},
  scoreNo: {type: Number, default: 1},
  description: {type: String, require: true},
  artistId: String,
  artistName: {type: String, require: true},
  isOriginal: {type: Boolean, require: true},
  songId: String,
  songName: {type: String, require: true},
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  authorName: {type: String, require: true},
  star: {type: Number, default: 0},
  isPublish: {type: Boolean, require: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var ScoreDocumentModel:IScoreDocumentModel = <IScoreDocumentModel>mongoose.model('Score', ScoreSchema);

ScoreSchema.static('createNewScore',
  (scoreNo:number,
   description:string,
   artistId:string,
   artistName:string,
   isOriginal:boolean,
   songId:string,
   songName:string,
   authorId:mongoose.Types.ObjectId,
   authorName:string,
   callback:(err:any, score:IScoreDocument)=>void)=> {
    var score = new ScoreDocumentModel({
      url: UriUtil.makeUri(artistName, songName, scoreNo),
      scoreNo: scoreNo,
      description: description,
      artistId: artistId,
      artistName: artistName,
      isOriginal: isOriginal,
      songId: songId,
      songName: songName,
      authorId: authorId,
      authorName: authorName,
      star: 0,
      isPublish: false
    });
    score.save(callback);
  });

var ScoreDocumentModel:IScoreDocumentModel = <IScoreDocumentModel> mongoose.model('Score', ScoreSchema);

export = ScoreDocumentModel;
