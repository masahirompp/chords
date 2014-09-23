/// <reference path="../typings/tsd.d.ts" />

import db = require('../db/db');
import Author = require('./Author');
import IAuthorDocument = require('../db/IAuthorDocument');
import IScoreDocument = require('../db/IScoreDocument');
import IChordDocument = require('../db/IChordDocument');

class Score {
  private _score:IScoreDocument;
  private _chord:IChordDocument;

  constructor(score:IScoreDocument, chord:IChordDocument) {
    this._score = score;
    this._chord = chord;
  }

  get chord():string[][] {
    return this._chord.chords;
  }

  get option():any {
    return this._chord.option;
  }

  private static CONST = {
    ORIGINAL: true,
    EXISTING: false,
    STAR_DEFAULT: 0,
    DRAFT: false
  };

  private static generateScoreNo(artistName:string, songName:string, callback:(err:any, scoreNo?:number)=> void) {
    db.Score.find({artistName: artistName, title: songName}, 'url', (err:any, results:IScoreDocument[])=> {
      if(err) {
        return callback(err);
      }
      if(results.length === 0) {
        return callback(null, 1);
      }
      var maxScoreId:number = _.chain(results).map((result) => {
        return Number(result.url.substring(result.url.lastIndexOf('/') + 1));
      }).max().value();
      callback(null, maxScoreId + 1);
    });
  }

  public static createNewOriginalScore(authorId:string,
                                       songName:string,
                                       description:string,
                                       callback:(err:any, score?:Score)=>void) {
    Author.getById(authorId, (err:any, author?:IAuthorDocument) => {
        if(err) {
          return callback(err);
        }
        this.generateScoreNo(author.name, songName, (err:any, scoreNo?:number) => {
          if(err) {
            return callback(err);
          }
          db.Score.createNewScore(scoreNo,
            description,
            authorId,
            author.name,
            this.CONST.ORIGINAL,
            songName, //TODO songID
            songName,
            authorId,
            author.name,
            (err:any, score:IScoreDocument) => {
              if(err) {
                return callback(err);
              }
              db.Chord.createNewChord(score._id, (err:any, chord:IChordDocument) => {
                callback(err, new Score(score, chord));
              });
            });
        });
      }
    );
  }


  public static createNewExistingScore(authorId:string,
                                       artistId:string,
                                       artistName:string,
                                       songId:string,
                                       songName:string,
                                       description:string,
                                       callback:(err:any, score?:Score)=>void) {
    Author.getById(authorId, (err:any, author?:IAuthorDocument) => {
      if(err) {
        return callback(err);
      }
      this.generateScoreNo(artistName, songName, (err:any, scoreNo?:number)=> {
        if(err) {
          return callback(err);
        }
        db.Score.createNewScore(scoreNo,
          description,
          artistId,
          artistName,
          this.CONST.EXISTING,
          songId,
          songName,
          authorId,
          author.name,
          (err:any, score:IScoreDocument) => {
            if(err) {
              callback(err);
            }
            db.Chord.createNewChord(score._id, (err:any, chord:IChordDocument) => {
              callback(err, new Score(score, chord));
            });
          });
      });
    });
  }

  public static find(artistName:string, songName:string, scoreNo:number, callback:(err:any, score?:Score)=>void) {
    db.Score.findOne({
      artistName: artistName,
      songName: songName,
      scoreNo: scoreNo
    }, (err:any, score:IScoreDocument) => {
      if(err) {
        callback(err);
      }
      console.dir(score);
      db.Chord.findOne({
        scoreId: score._id
      }, (err:any, chord:IChordDocument) => {
        if(err) {
          callback(err);
        }
        callback(err, new Score(score, chord));
      });
    });
  }

}

export = Score;
