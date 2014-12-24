/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');
import passport = require('passport');
import util = require('../util/Util');
import BaseModel = require('./BaseModel');
import UserDTO = require('../dto/_UserDTO');

var _schema = new mongoose.Schema({
    account: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    email: String,
    name: {
      type: String,
      required: 'ニックネームを入力してください。'
    },
    description: String,
    icon: {
      type: String
    },
    twitter: mongoose.Schema.Types.Mixed,
    facebook: mongoose.Schema.Types.Mixed,
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  })
  .plugin( < (schema: mongoose.Schema, options ? : Object) => void > uniqueValidator, {
    message: 'そのidは既に使用されているため、使用できません。'
  })
  .pre('save', function(next) {
    this.updated = new Date();
    next();
  });

interface IUser extends mongoose.Document, User {}

var _model = mongoose.model < IUser > ('User', _schema);

class User extends BaseModel {
  account: string; // URL等に使用する一意のID。変更不可。
  email: string;
  name: string;
  description: string;
  icon: string;
  twitter: passport.Profile;
  facebook: passport.Profile;

  static ICON = {
    IDENTICON: 'i',
    TWITTER: 't',
    FACEBOOK: 'f',
    LASTFM: 'l',
    GOOGLE: 'g'
  };

  /**
   * コンストラクタ
   * @param user
   */
  constructor(user: IUser) {
    super();
    if (user) {
      util.extend(this, user.toObject());
    }
  }

  /**
   * イメージ取得
   * @returns {string}
   */
  get image(): string {
    if (this.icon === User.ICON.TWITTER) {
      if (this.twitter && util.isArray(this.twitter.photos) && this.twitter.photos.length > 0) {
        return this.twitter.photos[0].value;
      }
    }
    return User.ICON.IDENTICON;
  }

  get json(): UserDTO {
    return <UserDTO > {
      account: this.account,
      name: this.name,
      image: this.image,
      description: this.description,
      email: this.email
    }
  }

  /**
   * イメージを更新する。
   * このメソッドはイメージ更新は投げっぱなし。同期ですぐに更新されたインスタンスを返す。
   * @param profile
   * @returns {*}
   */
  updateImage = (profile: passport.Profile): User => {
    if (!this.isValid) return this;

    // 変わっていない場合
    if (util.isEqual(this[profile.provider].photos, profile.photos)) return this;

    // 非同期で変更
    var instance = util.extend({}, this);
    instance[profile.provider] = profile;
    _model.findByIdAndUpdate(this._id, instance)
      .exec()
      .onReject(err => console.log(err));

    // クローンしたUserインスタンスをすぐに返す。
    return instance;
  };

  /**
   * IDからUserを取得する。
   * @param id
   * @returns {Promise<User>}
   */
  static findById = (id: string): Promise < User > => {
    return new Promise < User > ((resolve, reject) => {
      _model.findById(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        })
    })
  };

  /**
   * アカウントIDからUserを取得
   * @param account
   * @returns {Promise<User>}
   */
  static findByAccount = (account: string): Promise < User > => {
    return new Promise < User > ((resolve, reject) => {
      _model.findOne({
          accountId: account
        })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        })
    })
  };

  /**
   * nameからUserを取得する。基本的にnameの存在確認用。
   * @param name
   * @returns {Promise<User>}
   */
  static findByName = (name: string): Promise < User > => {
    return new Promise < User > ((resolve, reject) => {
      _model.findOne({
          name: name
        })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        })
    })
  };

  /**
   * twitter id でUserを取得する。
   * @param profile
   * @returns {Promise<User>}
   */
  static findByTwitter = (profile: passport.Profile): Promise < User > => {
    return new Promise < User > ((resolve, reject) => {
      _model.findOne({
          'twitter.id': profile.id
        })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        })
    })
  };

  /**
   * ユーザの検索
   * @param keyword
   * @param skip
   * @param limit
   * @returns {Promise<User[]>}
   */
  static search = (keyword: string, skip: number = 0, limit: number = 20): Promise < User[] > => {
    return new Promise < User[] > ((resolve, reject) => {
      _model.find({
          $and: User.makeKeywordQuery(keyword)
        })
        .sort({
          name: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(user.map(u => new User(u)));
        })
    })
  };

  /**
   * 一覧表示
   * @param skip
   * @param limit
   * @returns {Promise<User[]>}
   */
  static list = (skip ? : number, limit ? : number): Promise < User[] > => {
    return User.search(null, skip, limit);
  };

  /**
   * ユーザ作成
   * @param body postデータ
   * @param profile passportから受け取ったProfile
   * @returns {Promise<User>}
   */
  static create = (account: string, name: string, email: string, profile: passport.Profile): Promise < User > => {
    return new Promise < User > ((resolve, reject) => {
      // todo 入力チェック
      var obj = {
        account: account,
        name: name,
        email: email
      };
      obj[profile.provider] = profile;
      _model.create(obj)
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user))
        })
    });
  };

  /**
   * 更新処理
   * @param id
   * @param oldName
   * @param newName
   * @param email
   * @param profile
   * @param icon
   * @param image
   * @returns {Promise<User>}
   */
  static update = (id: string,
    oldName: string,
    newName: string,
    email: string,
    description: string,
    icon: string): Promise < User > => {

    return new Promise < User > ((resolve, reject) => {
      User.findById(id)
        .then(user => {
          // 存在確認
          if (!user.isValid || user.name !== oldName) {
            throw new Error('not found.');
          }
          // 更新データ
          var d = {};
          if (newName) d['name'] = newName;
          if (email) d['email'] = email;
          if (description) d['description'] = description;
          if (icon) d['icon'] = icon;
          // 更新処理
          _model.findByIdAndUpdate(id, d)
            .exec()
            .onResolve((err, updated) => {
              err ? reject(err) : resolve(new User(updated))
            })
        })
    })
  };

  /**
   * 削除
   * @param id
   * @returns {Promise<User>}
   */
  static remove = (id: string): Promise < boolean > => {
    return new Promise < boolean > ((resolve, reject) => {
      _model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, deleted) => {
          err ? reject(err) : resolve(true)
        })
    })
  };

  private static makeKeywordQuery = (keyword: string): any => {
    if (!keyword) return {};
    return util.split(keyword)
      .map(k => User.makeRegKeyword(k));
  };

  private static makeRegKeyword(keyword): any {
    var reg = new RegExp(util.escapeRegExp(keyword), 'i');
    return {
      $or: [{
        name: reg
      }, {
        profile: reg
      }]
    };
  }
}

export = User;
