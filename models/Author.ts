/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import User = require('./User');

interface IAuthor extends mongoose.Document {
  email: string;
  name: string;
  profile: string;
  icon: string;
  created: Date;
  updated: Date;
}

class Author {

  private static _schema = new mongoose.Schema({
    email: String,
    name: {
      type: String,
      required: true,
      index: {
        unique: true
      }
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
  });

  private static _model = mongoose.model < IAuthor > ('Author', Author._schema);

  /**
   * IDからAuthorを取得する。
   * @param authorId
   * @returns {Promise<Author>}
   */
  static findById = (authorId: string): Promise < Author > => {

    return new Promise < Author > ((resolve, reject) => {

      if (!authorId) resolve(null);

      Author._model.findById(authorId)
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(new Author(author));
        });
    });

  };

  /**
   * nameからAuthorを取得する。基本的にnameの存在確認用。
   * @param name
   * @returns {Promise<Author>}
   */
  static findByName(name: string): Promise < Author > {
    return new Promise < Author > ((resolve, reject) => {
      this._model.findOne({
          name: name
        })
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(new Author(author));
        })
    });
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
          this._model.create(author)
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
          this._model.findByIdAndUpdate(id, d)
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
      this._model.findByIdAndRemove(id)
        .exec()
        .onResolve((err, author) => {
          err ? reject(err) : resolve(true);
        })
    });
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

  get id():string{
    return this._author.id;
  }

  get name(): string {
    return this._author.name;
  }

  get json(): any {
    return {
      id: this._author.name,
      name: this._author.name,
      profile: this._author.profile,
      email: this._author.email,
      icon: this._author.icon
    }
  }

  get jsonWithAccount(): any {
    var d = this.json;
    d['account'] = User.findByAuthorId(this._author.id)
      .then(users => {
        return users.map(u => {
          return u.json;
        });
      });
    return d;
  }

}

export = Author;
