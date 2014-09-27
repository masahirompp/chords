/// <reference path="../typings/tsd.d.ts" />

import db = require('../db/db');
import IAuthorDocument = require('../db/IAuthorDocument');

class Author {
  private _author:IAuthorDocument;

  constructor(author:IAuthorDocument) {
    this._author = author;
  }

  get name():string {
    return this._author.name;
  }

  get isValid():boolean {
    return !!this._author;
  }

  static createNewAuthor = (name:string, email:string, callback:(err:any, author:Author)=>void) => {
    db.Author.createNewAuthor(name, email, (err:any, author:IAuthorDocument)=> {
      callback(err, new Author(author));
    });
  };

  static getById = (authorId:string, callback:(err:any, author?:IAuthorDocument)=>void) => {
    db.Author.findById(authorId, (err:any, author:IAuthorDocument) => {
      if(err) {
        return callback(err);
      }
      if(!author) {
        return callback(new Error('not found.'), author);
      }
      callback(null, author);
    });
  };
}

export = Author;
