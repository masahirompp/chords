/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import passport = require('passport');
import util = require('../util/Util');

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema({
    provider: {
      type: String,
      require: true
    },
    pid: {
      type: String,
      require: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    },
    displayName: {
      type: String
    },
    emails: {
      type: mongoose.Schema.Types.Mixed
    },
    photos: {
      type: mongoose.Schema.Types.Mixed
    },
    show: Boolean,
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

interface IUser extends mongoose.Document, User {}

var _model = mongoose.model < IUser > ('User', _schema);

class User {
  provider: string;
  pid: string;
  authorId: string;
  displayName: string;
  emails: any;
  photos: any;
  show: boolean;

  /**
   * static ユーザが存在しなければ作成して返す。
   * @param passport.Profile
   * @returns {Promise<User>}
   */
  static findOrCreate(profile: passport.Profile): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      _model.findOne({
          provider: profile.provider,
          pid: profile.id
        })
        .exec()
        .then(user => {
          if (user) {
            return resolve(new User(user.toObject()));
          }
          _model.create({
              provider: profile.provider,
              pid: profile.id,
              displayName: profile.displayName,
              emails: profile.emails,
              photos: profile.photos
            })
            .onResolve((err, user) => {
              err ? reject(err) : resolve(new User(user.toObject()));
            });
        });
    });
  }

  /**
   * static idからUserオブジェクトを取得
   * @param id
   * @returns {Promise<User>}
   */
  static findById(id: string): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      _model.findById(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user.toObject()));
        });
    })
  }

  /**
   * AuthorIdからUserを取得する。
   * @param authorId
   * @returns {Promise<User[]>}
   */
  static findByAuthorId(authorId: string): Promise < User[] > {
    return new Promise < User[] > ((resolve, reject) => {
      _model.find({
          authorId: authorId
        })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(user.map(u => {
            return new User(u);
          }));
        });
    });
  }

  /**
   * ユーザIDとAuthorIDを紐つける。
   * @param userId
   * @param authorId
   * @returns {Promise<User>}
   */
  static relateAuthor(userId: string, authorId: string): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      _model.findByIdAndUpdate(userId, {
          authorId: authorId
        })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        });
    });
  }

  /**
   * 削除
   * @param id
   * @returns {Promise}
   */
  static remove(id: string): Promise < boolean > {
    return new Promise((resolve, reject) => {
      _model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(true);
        })
    })
  }

  /**
   * コンストラクタ
   * @param mongoose.Document
   */
  constructor(user: any) {
    util.extend(this, user);
  }

  get image(): string {
    if (Array.isArray(this.photos)) {
      return this.photos.length > 0 ? this.photos[0] : null;
    }
    return this.photos;
  }

  get json(): any {
    return {
      provider: this.provider,
      image: this.image,
      show: this.show
    };
  }
}

export = User;
