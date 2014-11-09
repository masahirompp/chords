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

UserSchema.static('generateHash', (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

UserSchema.method('validPassword', function(password: string) {
  return bcrypt.compareSync(password, this.local.password);
});

var UserDocumentModel: IUserDocumentModel = < IUserDocumentModel > mongoose.model('User', UserSchema);

export = UserDocumentModel;