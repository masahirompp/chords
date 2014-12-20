/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');
import BaseModel = require('./BaseModel');
import Provider = require('./Provider');
import AuthorDTO = require('../dto/_AuthorDTO');
import util = require('../util/Util');

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
  profile: String,
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
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
  .plugin(< (schema:mongoose.Schema, options ?:Object) => void > uniqueValidator, {
    message: 'そのidは既に使用されているため、使用できません。'
  })
  .pre('save', function(next) {
    this.updated = new Date();
    next();
  });

interface IUser extends mongoose.Document, User {
}

var _model = mongoose.model < IUser >('User', _schema);

class User extends BaseModel {
  account:string; // URL等に使用する一意のID。変更不可。
  email:string;
  name:string;
  profile:string;
  icon:string;
  image:string;

  private static ICON = {
    IDENTICON: 'i',
    TWITTER: 'f',
    FACEBOOK: 'b'
  };

  /**
   * IDからUserを取得する。
   * @param id
   * @returns {Promise<User>}
   */
  static findById = (id:string):Promise < User > => {

    return new Promise < User >((resolve, reject) => {
      _model.findById(id)
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        });
    });

  };

  /**
   * アカウントIDからUserを取得
   * @param account
   * @returns {Promise<User>}
   */
  static findByAccount(account:string):Promise < User > {
    return new Promise < User >((resolve, reject) => {
      _model.findOne({
        accountId: account
      })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        });
    });
  }

  /**
   * nameからAuthorを取得する。基本的にnameの存在確認用。
   * @param name
   * @returns {Promise<User>}
   */
  static findByName(name:string):Promise < User > {
    return new Promise < User >((resolve, reject) => {
      _model.findOne({
        name: name
      })
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(new User(user));
        })
    });
  }

  /**
   * ユーザの検索
   * @param keyword
   * @param skip
   * @param limit
   * @returns {Promise<User[]>}
   */
  static search(keyword:string, skip:number = 0, limit:number = 20):Promise < User[] > {
    return new Promise < User[] >((resolve, reject) => {
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
        });
    });
  }

  /**
   * 一覧表示
   * @param skip
   * @param limit
   * @returns {Promise<User[]>}
   */
  static list(skip ?:number, limit ?:number):Promise < User[] > {
    return User.search(null, skip, limit);
  }

  /**
   * 新規Author作成。情報は最低限。
   * @param name
   * @param email
   * @returns {Promise<U>|Promise<Promise<User>>}
   */
  static create(name:string, email ?:string):Promise < User > {

    return this.findByName(name)
      .then(author => {
        if(author.isValid) {
          throw new Error('already exists');
        }
        return {
          account: util.makeUniqueId(),
          name: name,
          email: email || '',
          icon: User.ICON.IDENTICON,
          image: ''
        };
      })
      .then(user => {
        return new Promise < User >((resolve, reject) => {
          _model.create(user)
            .onResolve((err, u) => {
              err ? reject(err) : resolve(new User(u));
            })
        });
      });
  }

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
  static update(id:string,
                oldName:string,
                newName:string,
                email:string,
                profile:string,
                icon:string,
                image:string):Promise < User > {

    return new Promise < User >((resolve, reject) => {
      this.findById(id)
        .then(user => {
          // 存在確認
          if(!user.isValid || user.name !== oldName) {
            throw new Error('not found.');
          }
          // 更新データ
          var d = {};
          if(newName) d['name'] = newName;
          if(email) d['email'] = email;
          if(profile) d['profile'] = profile;
          if(icon) d['icon'] = icon;
          if(image) d['image'] = image;
          // 更新処理
          _model.findByIdAndUpdate(id, d)
            .exec()
            .onResolve((err, updated) => {
              err ? reject(err) : resolve(new User(updated));
            })
        })
    });
  }

  /**
   * 削除
   * @param id
   * @returns {Promise<User>}
   */
  static remove(id:string):Promise < boolean > {
    return new Promise < boolean >((resolve, reject) => {
      _model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, deleted) => {
          err ? reject(err) : resolve(true);
        })
    });
  }

  private static makeKeywordQuery(keyword:String):any {
    if(!keyword) return {};

    var query = [];
    keyword.split(' ')
      .forEach((k) => {
        query.push(User.makeRegKeyword(k));
      });
    return query
  }

  private static makeRegKeyword(keyword):any {
    var reg = new RegExp(keyword, 'i');
    return {
      $or: [{
              name: reg
            }, {
              profile: reg
            }]
    };
  }

  /**
   * コンストラクタ
   * @param user
   */
  constructor(user:IUser) {
    super();
    if(user) {
      util.extend(this, user);
    }
  }

  get json():AuthorDTO {
    return <AuthorDTO > {
      id: this.account,
      name: this.name,
      profile: this.profile,
      email: this.email,
      icon: this.icon,
      image: this.image
    }
  }

  /**
   * ログイン方法の一覧を取得
   * @returns {Promise<AuthorDTO>}
   */
  gerRelatedUsers():Promise < AuthorDTO > {
    return Provider.findByUserId(this.account)
      .then(users => {
        var d = this.json;
        d.account = users.map(u => {
          return u.json;
        });
        return d;
      });
  }

}

export = User;
