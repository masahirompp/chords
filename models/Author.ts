/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IAuthor extends mongoose.Document {
  email: string;
  name: string;
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

  static getById = (authorId: string): Promise < Author > => {

    return new Promise < Author > ((resolve, reject) => {

      if (!authorId) {
        resolve(null);
      }

      Author._model.findById(authorId)
        .exec()
        .onFulfill(author => {
          resolve(author ? new Author(author) : null);
        })
        .onReject(err => {
          reject(err);
        });
    });

  };

  static findByName(name: string): Promise < Author > {
    return new Promise < Author > ((resolve, reject) => {
      this._model.findOne({
          name: name
        })
        .exec()
        .onFulfill(author => {
          resolve(new Author(author));
        })
        .onReject(err => {
          reject(err);
        })
    });
  }

  static create(name: string, email ? : string): Promise < Author > {

    return this.findByName(name)
      .then(author => {
        if (author) {
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
            .onFulfill(author => {
              resolve(new Author(author));
            })
            .onReject(err => {
              reject(err);
            });
        });
      });
  }

  private _author: IAuthor;

  constructor(author: IAuthor) {
    this._author = author;
  }

  get name(): string {
    return this._author.name;
  }

  get isValid(): boolean {
    return !!this._author;
  }

  get json(): any {
    return {
      id: this._author.name,
      name: this._author.name
    }
  }

  get id(): string {
    return this._author._id;
  }

}

export = Author;
