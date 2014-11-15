/// <reference path="../tsd/tsd.d.ts" />

import db = require('../db/db');
import IAuthorDocument = require('../db/IAuthorDocument');

class Author {
  private _author: IAuthorDocument;

  constructor(author: IAuthorDocument) {
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

  static createNewAuthor = (name: string, email: string): Q.Promise < Author > => {
    return db.Author.createNewAuthor(name, email)
      .then((author: IAuthorDocument) => {
        return new Author(author);
      });
  };

  static getById = (authorId: string): Q.Promise < Author > => {

    return Q.promise < Author > ((resolve, reject) => {
      db.Author.findById(authorId)
        .exec()
        .onFulfill(author => {
          resolve(author ? new Author(author) : null);
        })
        .onReject(err => {
          reject(err);
        });
    });

  };
}

export = Author;