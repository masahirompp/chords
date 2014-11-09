/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IUserDocument extends mongoose.Document {
  local: {
    email: String;
    password: String;
  };
  facebook: {
    id: String;
    token: String;
    email: String;
    name: String;
  };
  twitter: {
    id: String;
    token: String;
    displayName: String;
    username: String;
  };
  google: {
    id: String;
    token: String;
    email: String;
    name: String;
  }
  created: Date;
  updated: Date;
}

export = IUserDocument;