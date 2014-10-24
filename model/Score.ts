/// <reference path="../tsd/tsd.d.ts" />

import db = require('../db/db');
import Author = require('./Author');
import IAuthorDocument = require('../db/IAuthorDocument');
import IScoreDocument = require('../db/IScoreDocument');
import IChordDocument = require('../db/IChordDocument');
import ScoreDTO = require('../dto/_ScoreDTO');

class Score {

  private _score: IScoreDocument;
  private _chord: IChordDocument;

  constructor(score: IScoreDocument, chord ? : IChordDocument) {
    this._score = score;
    if (chord) {
      this._chord = chord;
    }
  }

  get chord(): Array < Array < string >> {
    return this._chord.chords;
  }

  get option(): any {
    return this._chord.option;
  }

  get json(): ScoreDTO {
    return <ScoreDTO > {
      author: {
        id: this._score.authorName,
        name: this._score.authorName
      },
      song: {
        id: this._score.songId,
        name: this._score.songName,
        artist: {
          id: this._score.artistId,
          name: this._score.artistName,
          isOriginal: this._score.isOriginal
        }
      },
      scoreNo: this._score.scoreNo,
      star: this._score.star,
      description: this._score.description,
      chords: this._chord ? this._chord.chords : [],
      option: this._chord ? this._chord.option : {}
    }
  }

  private static CONST = {
    ORIGINAL: true,
    EXISTING: false,
    STAR_DEFAULT: 0,
    DRAFT: false
  };

  private static generateScoreNo(artistId: string, songId: string): Q.Promise < number > {
    var d = Q.defer < number > ();

    db.Score.find({
      artistId: artistId,
      songId: songId
    }, 'url', (err: any, results: IScoreDocument[]) => {
      if (err) {
        return d.reject(err);
      }
      if (results.length === 0) {
        return d.resolve(1);
      }
      var maxScoreId = 1;
      results.map(result => {
          return Number(result.url.substring(result.url.lastIndexOf('/') + 1));
        })
        .forEach(n => {
          if (n > maxScoreId) maxScoreId = n;
        });
      d.resolve(maxScoreId + 1);
    });

    return d.promise;
  }

  static createNewOriginalScore(authorId: string, songName: string, description: string): Q.Promise < Score > {

    // TODO
    var songId = songName;

    return Q.all([Author.getById(authorId), Score.generateScoreNo(authorId, songId)])
      .then((values: any[]) => {
        var author = < Author > values[0];
        var scoreNo = < number > values[1];
        return db.Score.createNewScore(scoreNo,
          description,
          authorId,
          author.name,
          this.CONST.ORIGINAL,
          songName, //TODO songID
          songName,
          authorId,
          author.name)
      })
      .then((score: IScoreDocument) => {
        return db.Chord.createNewChord(score._id)
          .then((chord: IChordDocument) => {
            return new Score(score, chord);
          })
      });
  }

  static createNewExistingScore(authorId: string,
    artistId: string,
    artistName: string,
    songId: string,
    songName: string,
    description: string): Q.Promise < Score > {
    return Author.getById(authorId)
      .then((author: Author) => {

        return Score.generateScoreNo(artistName, songName)
          .then((scoreNo: number) => {
            return db.Score.createNewScore(scoreNo,
                description,
                artistId,
                artistName,
                this.CONST.EXISTING,
                songId,
                songName,
                authorId,
                author.name)
              .then((score: IScoreDocument) => {
                return db.Chord.createNewChord(score._id)
                  .then((chord: IChordDocument) => {
                    return new Score(score, chord);
                  });
              });
          });

      })
  }

  static find(artistName: string, songName: string, scoreNo: number): Q.Promise < Score > {

    var d = Q.defer < Score > ();

    db.Score.findOne({
      artistName: artistName,
      songName: songName,
      scoreNo: scoreNo
    }, (err: any, score: IScoreDocument) => {
      if (err) {
        return d.reject(err);
      }
      db.Chord.findOne({
        scoreId: score._id
      }, (err: any, chord: IChordDocument) => {
        if (err) {
          return d.reject(err);
        }
        d.resolve(new Score(score, chord));
      });
    });

    return d.promise;
  }

  static search(keyword: string): Q.Promise < Score[] > {
    var d: Q.Deferred < Score[] > = Q.defer < Score[] > ();
    db.Score.find({
      $and: Score.makeKeywordQuery(keyword)
    }, (err: any, scores: IScoreDocument[]) => {
      if (err) {
        return d.reject(err);
      }
      d.resolve(scores.map(doc => {
        return new Score(doc);
      }));
    });

    return d.promise;
  }

  static toJson(scores: Score[]): ScoreDTO[] {
    return scores.map((score) => {
      return score.json;
    });
  }

  private static makeKeywordQuery(keyword: string): any[] {
    var query = [];
    keyword.split(' ')
      .forEach((k) => {
        query.push(Score.makeRegKeyword(k));
      });
    return query
  }

  private static makeRegKeyword(keyword): any {
    var reg = new RegExp(keyword, 'i');
    return {
      $or: [{
        artistName: reg
      }, {
        songName: reg
      }]
    };
  }

}

export = Score;