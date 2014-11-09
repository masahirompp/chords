/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');
import IUserDocumentModel = require('IUserDocumentModel');

var bcrypt: any = require('bcrypt-nodejs');

var UserSchema: mongoose.Schema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
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

UserSchema.static('generateHash', (password: string, callback: (err: any, hash: string) => void) => {
  bcrypt.hash(password, bcrypt.genSaltSync(8), null, callback);
});

UserSchema.method('validPassword', function(password, callback) {
  bcrypt.compare(password, this.local.password, callback);
});

var UserDocumentModel: IUserDocumentModel = < IUserDocumentModel > mongoose.model('User', UserSchema);

export = UserDocumentModel;