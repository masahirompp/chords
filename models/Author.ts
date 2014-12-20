/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import uniqueValidator = require('mongoose-unique-validator');
import User = require('./User');
import AuthorDTO = require('../dto/_AuthorDTO');

interface IAuthor extends mongoose.Document {
  id: string;
  email: string;
  name: string;
  profile: string;
  icon: string;
  created: Date;
  updated: Date;
}

var _schema = new mongoose.Schema({
    id: {
      type: String,
      required: 'idを入力してください。',
      index: {
        unique: true
      },
      validate: /^\w+$/i
    },
    email: String,
    name: {
      type: String,
      required: 'ニックネームを入力してください。'
    },
    profile: String,
    icon: String,
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

var _model = mongoose.model < IAuthor > ('Author', _schema);

class Author {

  /**
   * IDからAuthorを取得する。
   * @param authorId
   * @returns {Promise<Author>}
   */
  static findById = (authorId: string): Promise < Author > => {

    return new Promise < Author > ((resolve, reject) => {

      if (!authorId) resolve(null);

      _model.findById(authorId)
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(new Author(author));
        });
    });

  };

  /**
   * アカウントIDからAuthorを取得
   * @param id
   * @returns {Promise<Author>}
   */
  static findByAccountId(id: string): Promise < Author > {
    return new Promise < Author > ((resolve, reject) => {
      _model.findOne({
          id: id
        })
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(new Author(author));
        });
    });
  }

  /**
   * nameからAuthorを取得する。基本的にnameの存在確認用。
   * @param name
   * @returns {Promise<Author>}
   */
  static findByName(name: string): Promise < Author > {
    return new Promise < Author > ((resolve, reject) => {
      _model.findOne({
          name: name
        })
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(new Author(author));
        })
    });
  }

  /**
   * ユーザの検索
   * @param keyword
   * @param skip
   * @param limit
   * @returns {Promise<Author[]>}
   */
  static search(keyword: string, skip: number = 0, limit: number = 20): Promise < Author[] > {
    return new Promise < Author[] > ((resolve, reject) => {
      _model.find({
          $and: Author.makeKeywordQuery(keyword)
        })
        .sort({
          name: 1
        })
        .skip(skip)
        .limit(limit)
        .exec()
        .onResolve((err, authors) => {
          err ? reject(err) : resolve(authors.map(a => new Author(a)));
        });
    });
  }

  /**
   * 一覧表示
   * @param skip
   * @param limit
   * @returns {Promise<Author[]>}
   */
  static list(skip ? : number, limit ? : number): Promise < Author[] > {
    return Author.search(null, skip, limit);
  }

  /**
   * 新規Author作成。情報は最低限。
   * @param name
   * @param email
   * @returns {Promise<U>|Promise<Promise<Author>>}
   */
  static create(name: string, email ? : string): Promise < Author > {

    return this.findByName(name)
      .then(author => {
        if (author.isValid) {
          throw new Error('already exists');
        }
        return {
          name: name,
          email: email || ''
        };
      })
      .then(author => {
        return new Promise < Author > ((resolve, reject) => {
          _model.create(author)
            .onResolve((err, author) => {
              err ? reject(err) : resolve(new Author(author));
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
   * @returns {Promise<Author>}
   */
  static update(id: string, oldName: string, newName: string, email: string, profile: string, icon: string): Promise < Author > {

    return new Promise < Author > ((resolve, reject) => {
      this.findById(id)
        .then(author => {
          // 存在確認
          if (!author.isValid || author.name !== oldName) {
            throw new Error('not found.');
          }
          // 更新データ
          var d = {};
          if (newName) d['name'] = newName;
          if (email) d['email'] = email;
          if (profile) d['profile'] = profile;
          if (icon) d['icon'] = icon;
          // 更新処理
          _model.findByIdAndUpdate(id, d)
            .exec()
            .onResolve((err, updated) => {
              err ? reject(err) : resolve(new Author(updated));
            })
        })
    });
  }

  /**
   * 削除
   * @param id
   * @returns {Promise<Author>}
   */
  static remove(id: string): Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
      _model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(true);
        })
    });
  }

  private static makeKeywordQuery(keyword: String): any {
    if (!keyword) return {};

    var query = [];
    keyword.split(' ')
      .forEach((k) => {
        query.push(Author.makeRegKeyword(k));
      });
    return query
  }

  private static makeRegKeyword(keyword): any {
    var reg = new RegExp(keyword, 'i');
    return {
      $or: [{
        name: reg
      }, {
        profile: reg
      }]
    };
  }

  private _author: IAuthor;

  /**
   * コンストラクタ
   * @param author
   */
  constructor(author: IAuthor) {
    this._author = author;
  }

  get isValid(): boolean {
    return !!this._author;
  }

  get objectId(): string {
    return this._author._id;
  }

  get id(): string {
    return this._author.id;
  }

  get name(): string {
    return this._author.name;
  }

  get json(): AuthorDTO {
    return <AuthorDTO > {
      id: this._author.name,
      name: this._author.name,
      profile: this._author.profile,
      email: this._author.email,
      icon: this._author.icon
    }
  }

  gerRelatedUsers(): Promise < AuthorDTO > {
    return User.findByAuthorId(this._author.id)
      .then(users => {
        var d = this.json;
        d.account = users.map(u => {
          return u.json;
        });
        return d;
      });
  }

}

export = Author;