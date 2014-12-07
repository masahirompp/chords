/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import ScoreDTO = require('../dto/_ScoreDTO');
import Author = require('./Author');
import Chord = require('./Chord');
import UriUtil = require('../util/Util');

interface IScore extends mongoose.Document {
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

class Score {

  private static _schema = new mongoose.Schema({
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
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
      },
      authorName: {
        type: String,
        require: true
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

  private static _model = mongoose.model < IScore > ('Score', Score._schema);

  private static createNewScore(scoreNo: number,
    description: string,
    artistId: string,
    artistName: string,
    isOriginal: boolean,
    songId: string,
    songName: string,
    authorId: mongoose.Types.ObjectId,
    authorName: string): Promise < Score > {

    return new Promise < Score > ((resolve, reject) => {
      this._model.create({
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
        })
        .onResolve((err, score) => {
          err ? reject(err) : resolve(new Score(score));
        });
    });
  }

  static createNewOriginalScore(authorId: string, songName: string, description: string): Promise < Score > {

    // TODO
    var songId = songName;

    return Promise.all([Author.findById(authorId), Score.generateScoreNo(authorId, songId)])
      .then((values: any[]) => {
        var author = < Author > values[0];
        var scoreNo = < number > values[1];
        return this.createNewScore(scoreNo,
          description,
          authorId,
          author.name,
          this.CONST.ORIGINAL,
          songName, //TODO songID
          songName,
          authorId,
          author.name)
      });
  }

  static createNewExistingScore(authorId: string,
    artistId: string,
    artistName: string,
    songId: string,
    songName: string,
    description: string): Promise < Score > {
    return Author.findById(authorId)
      .then((author: Author) => {

        return Score.generateScoreNo(artistName, songName)
          .then((scoreNo: number) => {
            return this.createNewScore(scoreNo,
              description,
              artistId,
              artistName,
              this.CONST.EXISTING,
              songId,
              songName,
              authorId,
              author.name)
          });

      })
  }

  /**
   * 対象の楽譜を取得
   * @param artistName
   * @param songName
   * @param scoreNo
   * @returns {Promise<Score>}
   * @desc 公開中・非公開の判定は呼び出し元で実施すること。
   */
  static find(artistName: string, songName: string, scoreNo: number): Promise < Score > {

    return new Promise < Score > ((resolve, reject) => {
      this._model.findOne({
          artistName: artistName,
          songName: songName,
          scoreNo: scoreNo
        })
        .exec()
        .onResolve((err, score) => {
          err ? reject(err) : resolve(new Score(score));
        });
    });
  }

  /**
   * 対象曲の楽譜一覧を取得（公開中のみ）
   * @param artistName
   * @param songName
   * @returns {Promise<Score>}
   */
  static findBySong(artistName: string, songName: string, skip: number = 0, limit: number = 20): Promise < Score[] > {

    return new Promise < Score[] > ((resolve, reject) => {
      this._model.find({
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
          err ? reject(err) : resolve(scores.map(s => new Score(s)));
        });
    });
  }

  /**
   * 対象アーティストの楽譜を取得（公開中のみ）
   * @param artistName
   * @returns {Promise<Score>}
   */
  static findByArtist(artistName: string, skip: number = 0, limit: number = 20): Promise < Score[] > {

    return new Promise < Score[] > ((resolve, reject) => {
      this._model.find({
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
          err ? reject(err) : resolve(scores.map(s => new Score(s)));
        });
    });
  }

  /**
   * 作成者で楽譜を検索
   * @param accountId
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static findByAuthor(accountId: string, skip: number = 0, limit: number = 20): Promise < Score[] > {

    return new Promise < Score[] > ((resolve, reject) => {
      Author.findByAccountId(accountId)
        .then(author => {
          if (!author.isValid) return reject(new Error('not found.'))
          this._model.find({
              authorId: author.objectId,
              isPublish: true
            })
            .sort({
              url: 1
            })
            .skip(skip)
            .limit(limit)
            .exec()
            .onResolve((err, scores) => {
              err ? reject(err) : resolve(scores.map(s => new Score(s)));
            });
        })
    });
  }

  /**
   * 自分が作成した作品一覧を取得
   * @param authorId 自分のID
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static findMyWorks(authorId: string, skip: number = 0, limit: number = 20): Promise < Score[] > {
    return new Promise < Score[] > ((resolve, reject) => {
      this._model.find({
          authorId: authorId
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)));
        });
    });
  }

  /**
   * キーワード検索。公開中の楽譜のみ。
   * @param keyword
   * @param skip
   * @param limit
   * @returns {Promise<Score[]>}
   */
  static search(keyword: string, skip: number = 0, limit: number = 20): Promise < Score[] > {

    return new Promise < Score[] > ((resolve, reject) => {
      this._model.find({
          $and: Score.makeKeywordQuery(keyword)
        })
        .sort({
          url: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, scores) => {
          err ? reject(err) : resolve(scores.map(s => new Score(s)));
        });
    });
  }

  private static makeKeywordQuery(keyword: string): any[] {
    var query = [{
      isPublish: true
    }];
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

  /**
   * 楽譜No.生成
   * @param artistId
   * @param songId
   * @returns {Promise<number>}
   */
  private static generateScoreNo(artistId: string, songId: string): Promise < number > {

    return new Promise < number > ((resolve, reject) => {
      this._model.find({
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
  }

  private static CONST = {
    ORIGINAL: true,
    EXISTING: false,
    STAR_DEFAULT: 0,
    DRAFT: false
  };

  private _score: IScore;

  constructor(score: IScore) {
    this._score = score;
  }

  get isValid(): boolean {
    return !!this._score;
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
      description: this._score.description
    }
  }

  makeJsonWithChord(): Promise < ScoreDTO > {
    return Chord.findByScoreId(this._score.id)
      .then(chord => {
        var d = this.json;
        d.chords = chord.chords;
        d.option = chord.option;
        return d;
      });
  }

}

export = Score;