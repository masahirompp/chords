/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import passport = require('passport');
import BaseModel = require('./BaseModel');
import Author = require('./User');
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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

interface IProvider extends mongoose.Document, Provider {}

var _model = mongoose.model < IProvider > ('Provider', _schema);

class Provider extends BaseModel {
  provider: string;
  //pid:string
  userId: string;
  displayName: string;
  emails: any;
  photos: any;
  show: boolean;

  /**
   * static 認証方式が存在しなければ作成して返す。
   * @param passport.Profile
   * @returns {Promise<Provider>}
   */
  static findOrCreate(profile: passport.Profile): Promise < Provider > {
    return new Promise < Provider > ((resolve, reject) => {
      _model.findOne({
          provider: profile.provider,
          pid: profile.id
        })
        .exec()
        .then(provider => {
          if (provider) {
            return resolve(new Provider(provider));
          }
          _model.create({
              provider: profile.provider,
              pid: profile.id,
              displayName: profile.displayName,
              emails: profile.emails,
              photos: profile.photos
            })
            .onResolve((err, provider) => {
              err ? reject(err) : resolve(new Provider(provider));
            });
        });
    });
  }

  /**
   * static idからProviderオブジェクトを取得
   * @param id
   * @returns {Promise<Provider>}
   */
    static findById(id: string): Promise < Provider > {
    return new Promise < Provider > ((resolve, reject) => {
      _model.findById(id)
        .exec()
        .onResolve((err, provider) => {
          err ? reject(err) : resolve(new Provider(provider));
        });
    })
  }

  /**
   * UserIdからProviderを取得する。
   * @param userId
   * @returns {Promise<Provider[]>}
   */
    static findByUserId(userId: string): Promise < Provider[] > {
    return new Promise < Provider[] > ((resolve, reject) => {
      _model.find({
          userId: userId
        })
        .exec()
        .onResolve((err, provider) => {
          err ? reject(err) : resolve(provider.map(p => {
            return new Provider(p);
          }));
        });
    });
  }

  /**
   * ProviderIDとUserIDを紐つける。
   * @param providerId
   * @param userId
   * @returns {Promise<Provider>}
   */
    static relateAuthor(providerId: string, userId: string): Promise < Provider > {
    return new Promise < Provider > ((resolve, reject) => {
      _model.findByIdAndUpdate(providerId, {
          userId: userId
        })
        .exec()
        .onResolve((err, provider) => {
          err ? reject(err) : resolve(new Provider(provider));
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
        .onResolve((err, deleted) => {
          err ? reject(err) : resolve(true);
        })
    })
  }

  /**
   * コンストラクタ
   * @param provider
   */
    constructor(provider: IProvider) {
    super();
    if (provider) {
      util.extend(this, provider.toObject());
    }
  }

  /**
   * 関係付けられたAuthorを取得
   * @returns {Promise<User>}
   */
    findAuthor(): Promise < Author > {
    return Author.findById(this.userId);
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

export = Provider;
