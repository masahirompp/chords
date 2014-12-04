/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import passport = require('passport');

interface IUser extends mongoose.Document {
  provider: string;
  id: string;
  authorId: string;
  displayName: string;
  emails: any;
  photos: any;
  created: Date;
  updated: Date;
}

class User {

  /**
   * MongooseSchema
   * @type {"mongoose".Schema}
   * @private
   */
  private static _schema: mongoose.Schema = new mongoose.Schema({
    provider: {
      type: String,
      require: true
    },
    id: {
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
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  });

  /**
   * Mongoose.Model
   * @type {Model<IUser>}
   * @private
   */
  private static _model = mongoose.model < IUser > ('User', User._schema);

  /**
   * static ユーザが存在しなければ作成して返す。
   * @param passport.Profile
   * @returns {Promise<User>}
   */
  static findOrCreate(profile: passport.Profile): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      this._model.findOne({
          provider: profile.provider,
          id: profile.id
        })
        .exec()
        .then(user => {
          if (user) {
            return resolve(new User(user));
          }
          this._model.create({
              provider: profile.provider,
              id: profile.id,
              displayName: profile.displayName,
              emails: profile.emails,
              photos: profile.photos
            })
            .onFulfill(user => {
              resolve(new User(user));
            })
            .onReject(err => {
              reject(err)
            });
        });
    });
  }

  static findById(id: string): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      this._model.findById(id)
        .exec()
        .onFulfill(user => resolve(new User(user)))
        .onReject(err => reject(err));
    })
  }

  static relateAuthor(userId: string, authorId: string): Promise < User > {
    return new Promise < User > ((resolve, reject) => {
      this._model.findByIdAndUpdate(userId, {
          authorId: authorId
        })
        .exec()
        .onFulfill(user => {
          resolve(new User(user));
        })
        .onReject(err => {
          reject(err);
        });
    });
  }

  /**
   * インスタンス変数
   */
  private _document: IUser;

  /**
   * コンストラクタ
   * @param mongoose.Document<IUser>
   */
  constructor(document: IUser) {
    this._document = document;
  }

}

export = User;
