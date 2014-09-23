/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IAuthorDocument = require('IAuthorDocument');
import IAuthorDocumentModel = require('IAuthorDocumentModel');

var AuthorSchema:mongoose.Schema = new mongoose.Schema({
  email: String,
  name: {type: String, required: true, index: {unique: true}},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var AuthorDocumentModel:IAuthorDocumentModel = <IAuthorDocumentModel>mongoose.model('Author', AuthorSchema);

AuthorSchema.static('createNewAuthor',
  (name:string, email:string, callback:(err:any, result:IAuthorDocument)=>void) => {
    AuthorDocumentModel.findByName(name, (err:any, author:IAuthorDocument) => {
      if(err) {
        return callback(err, null);
      }
      if(author) {
        return callback(new Error('already exists.'), author);
      }
      author = <IAuthorDocument>new AuthorDocumentModel({name: name, email: email});
      author.save(callback);
    });
  });

AuthorSchema.static('findByName', (name:string, callback:(err:any, result:IAuthorDocument)=>void)=> {
  AuthorDocumentModel.findOne({name: name}, callback);
});

export = AuthorDocumentModel;
