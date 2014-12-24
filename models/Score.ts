/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import ScoreDTO = require('../dto/_ScoreDTO');
import BaseModel = require('./BaseModel');
import User = require('./User');
import Chord = require('./Chord');
import util = require('../util/Util');

var _schema = new mongoose.Schema({
    url: {
      type: String,
      require: true,
      unique: true
    },
    scoreNo: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      require: '説明文が入力されていません。'
    },
    artistId: String,
    artistName: {
      type: String,
      require: true
    },
    isOriginal: {
      type: Boolean,
      require: true
    },
    songId: String,
    songName: {
      type: String,
      require: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    star: {
      type: Number,
      default: 0
    },
    isPublish: {
      type: Boolean,
      require: true
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

interface IScore extends mongoose.Document, Score {}

var _model = mongoose.model < IScore > ('Score', _schema);

class Score extends BaseModel {
  url: string;
  scoreNo: number;
  description: string;
  artistId: string;
  artistName: string;
  isOriginal: boolean;
  songId: string;
  songName: string;
  userId: string;
  star: number;
  isPublish: boolean;

  private static createNewScore = (scoreNo: number,
    description: string,
    artistId: string,
    artistName: string,
    isOriginal: boolean,
    songId: string,
    songName: string,
    authorId: string,
    authorName: string): Promise < Score > => {

    return new Promise < Score > ((resolve, reject) => {
      _model.create({
          url: util.makeUri(artistName, songName, scoreNo),
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
        })
        .onResolve((err, score) => {
          err ? reject(err) : resolve(new Score(score))
        })
    })
  };

  static createNewOriginalScore = (authorId: string, songName: string, description: string): Promise < Score > => {

    // TODO
    var songId = songName;

    return Promise.all([User.findById(authorId), Score.generateScoreNo(authorId, songId)])
      .then((values: any[]) => {
        var author = < User > values[0];
        var scoreNo = < number > values[1];
        return Score.createNewScore(scoreNo,
          description,
          authorId,
          author.name,
          Score.CONST.ORIGINAL,
          songName, //TODO songID
          songName,
          authorId,
          author.name)
      })
  };

  static createNewExistingScore = (authorId: string,
    artistId: string,
    artistName: string,
    songId: string,
    songName: string,
    description: string): Promise < Score > => {
    return User.findById(authorId)
      .then((author: User) => {

        return Score.generateScoreNo(artistName, songName)
          .then((scoreNo: number) => {
            return Score.createNewScore(scoreNo,
              description,
              artistId,
              artistName,
              Score.CONST.EXISTING,
              songId,
              songName,
              authorId,
              author.name)
          })
      })
  };

  /**
   * 対象の楽譜を取得
   * @param artistName
   * @param songName
   * @param scoreNo
   * @returns {Promise<Score>}
   * @desc 公開中・非公開の判定は呼び出し元で実施すること。
   */
  static find = (artistName: string, songName: string, scoreNo: number): Promise < Score > => {
    return new Promise < Score > ((resolve, reject) => {
      _model.findOne({
          artistName: artistName,
          songName: songName,
          scoreNo: scoreNo
        })
        .exec()
        .onResolve((err, score) => {
          err ? reject(err) : resolve(new Score(score));
        })
    })
  };

  /**
   * 対象曲の楽譜一覧を取得（公開中のみ）
   * @param artistName
   * @param songName
   * @returns {Promise<Score>}
   */
  static findBySong = (artistName: string, songName: string, skip: number = 0, limit: number = 20): Promise < Score[] > => {

    return new Promise < Score[] > ((resolve, reject) => {
      _model.find({
          artistName: artistName,
          songName: songName,
          isPublish: true
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)))
        })
    })
  };

  /**
   * 対象アーティストの楽譜を取得（公開中のみ）
   * @param artistName
   * @returns {Promise<Score>}
   */
  static findByArtist = (artistName: string, skip: number = 0, limit: number = 20): Promise < Score[] > => {

    return new Promise < Score[] > ((resolve, reject) => {
      _model.find({
          artistName: artistName,
          isPublish: true
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)))
        })
    })
  };

  /**
   * 作成者で楽譜を検索
   * @param accountId
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static findByAuthor = (accountId: string, skip: number = 0, limit: number = 20): Promise < Score[] > => {

    return new Promise < Score[] > ((resolve, reject) => {
      User.findByAccount(accountId)
        .then(author => {
          if (!author.isValid) return reject(new Error('not found.'))
          _model.find({
              authorId: author._id,
              isPublish: true
            })
            .sort({
              url: 1
            })
            .skip(skip)
            .limit(limit)
            .exec()
            .onResolve((err, scores) => {
              err ? reject(err) : resolve(scores.map(s => new Score(s)))
            })
        })
    })
  };

  /**
   * 自分が作成した作品一覧を取得
   * @param authorId 自分のID
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static findMyWorks = (authorId: string, skip: number = 0, limit: number = 20): Promise < Score[] > => {
    return new Promise < Score[] > ((resolve, reject) => {
      _model.find({
          authorId: authorId
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)))
        })
    })
  };

  /**
   * 公開中の楽譜一覧取得（最新順）
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static list = (skip: number = 0, limit: number = 20): Promise < Score[] > => {
    return new Promise < Score[] > ((resolve, reject) => {
      _model.find({
          isPublish: true
        })
        .sort({
          created: -1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)))
        })
    })
  };

  /**
   * キーワード検索。公開中の楽譜のみ。
   * @param keyword
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static search = (keyword: string, skip: number = 0, limit: number = 20): Promise < Score[] > => {

    return new Promise < Score[] > ((resolve, reject) => {
      _model.find({
          $and: Score.makeKeywordQuery(keyword)
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)))
        })
    })
  };

  private static makeKeywordQuery = (keyword: string): any[] => {
    var query = [{
      isPublish: true
    }];
    keyword.split(' ')
      .forEach((k) => {
        query.push(Score.makeRegKeyword(k))
      });
    return query
  };

  private static makeRegKeyword = (keyword: string): any => {
    var reg = new RegExp(keyword, 'i');
    return {
      $or: [{
        artistName: reg
      }, {
        songName: reg
      }]
    }
  };

  /**
   * 楽譜No.生成
   * @param artistId
   * @param songId
   * @returns {Promise<number>}
   */
  private static generateScoreNo = (artistId: string, songId: string): Promise < number > => {

    return new Promise < number > ((resolve, reject) => {
      _model.find({
          artistId: artistId,
          songId: songId
        })
        .exec()
        .onFulfill(scores => {
          if (scores.length === 0) {
            return resolve(1);
          }
          var maxScoreId = 1;
          scores.map(result => {
              return Number(result.url.substring(result.url.lastIndexOf('/') + 1));
            })
            .forEach(n => {
              if (n > maxScoreId) maxScoreId = n;
            });
          resolve(maxScoreId);
        })
        .onReject(err => {
          reject(err);
        })
    });
  };

  private static CONST = {
    ORIGINAL: true,
    EXISTING: false,
    STAR_DEFAULT: 0,
    DRAFT: false
  };

  constructor(score: IScore) {
    super();
    if (score) {
      util.extend(this, score.toObject());
    }
  }

  get json(): ScoreDTO {
    return <ScoreDTO > {
      user: {
        account: this.userId
      },
      song: {
        id: this.songId,
        name: this.songName,
        artist: {
          id: this.artistId,
          name: this.artistName,
          isOriginal: this.isOriginal
        }
      },
      scoreNo: this.scoreNo,
      star: this.star,
      description: this.description
    }
  }

  jsonWithUser(): Promise < ScoreDTO > {
    return User.findById(this.userId)
      .then(user => {
        var d = this.json;
        d.user.name = user.name;
        d.user.image = user.image;
        return d;
      })
  }

    jsonWithChord(): Promise < ScoreDTO > {
    return Chord.findByScoreId(this._id)
      .then(chord => {
        var d = this.json;
        d.chords = chord.chords;
        d.option = chord.option;
        return d;
      });
  }

}

export = Score;