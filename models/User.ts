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
  show: boolean;
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
    show: Boolean,
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
            .onResolve((err, user) => {
              err ? reject(err) : resolve(new User(user));
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
      this._model.findById(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
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
      this._model.find({
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
      this._model.findByIdAndUpdate(userId, {
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
      this._model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(true);
        })
    })
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

  get provider(): string {
    return this._document.provider;
  }

  get image(): string {
    if (Array.isArray(this._document.photos)) {
      return this._document.photos.length > 0 ? this._document.photos[0] : null;
    }
    return this._document.photos;
  }

  get show(): boolean {
    return this._document.show;
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
