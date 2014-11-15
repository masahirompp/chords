/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IAuthorDocument = require('IAuthorDocument');
import IAuthorDocumentModel = require('IAuthorDocumentModel');

var AuthorSchema: mongoose.Schema = new mongoose.Schema({
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

AuthorSchema.static('createNewAuthor', (name: string, email ? : string): Q.Promise < IAuthorDocument > => {

  return AuthorDocumentModel.findByName(name)
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
      return Q.promise < IAuthorDocument > ((resolve, reject) => {
        AuthorDocumentModel.create(author)
          .onFulfill(author => {
            resolve(author);
          })
          .onReject(err => {
            reject(err);
          });
        //author.save((err, author) => {
        //  if (err) {
        //    reject(err);
        //    return;
        //  }
        //  resolve(author);
        //});
      });
    });

});

AuthorSchema.static('findByName', (name: string): Q.Promise < IAuthorDocument > => {

  return Q.promise < IAuthorDocument > ((resolve, reject) => {
    AuthorDocumentModel.findOne({
        name: name
      })
      .exec()
      .onFulfill(author => {
        resolve(author);
      })
      .onReject(err => {
        reject(err);
      })
  });

});

var AuthorDocumentModel: IAuthorDocumentModel = < IAuthorDocumentModel > mongoose.model('Author', AuthorSchema);

export = AuthorDocumentModel;