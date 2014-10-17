/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IAuthorDocument = require('IAuthorDocument');
import IAuthorDocumentModel = require('IAuthorDocumentModel');

var AuthorSchema:mongoose.Schema = new mongoose.Schema({
  email: String,
  name: {type: String, required: true, index: {unique: true}},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

AuthorSchema.static('createNewAuthor',
  (name:string, email:string):Q.Promise<IAuthorDocument> => {

    var d = Q.defer<IAuthorDocument>();

    AuthorDocumentModel.findByName(name)
      .then((author:IAuthorDocument) => {
        if(author) {
          d.reject(new Error('already exists.'));
          return;
        }
        author = <IAuthorDocument>new AuthorDocumentModel({name: name, email: email});
        author.save((err) => {
          err ? d.reject(err) : d.resolve(author);
        });
      });

    return d.promise;
  });

AuthorSchema.static('findByName', (name:string):Q.Promise<IAuthorDocument> => {
  var d = Q.defer<IAuthorDocument>();

  AuthorDocumentModel.findOne({name: name}, (err, author:IAuthorDocument) => {
    err ? d.reject(err) : d.resolve(author);
  });

  return d.promise;
});

var AuthorDocumentModel:IAuthorDocumentModel = <IAuthorDocumentModel>mongoose.model('Author', AuthorSchema);

export = AuthorDocumentModel;
