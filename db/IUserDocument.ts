/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IUserDocument extends mongoose.Document {
  provider:string;
  id:string;
  created: Date;
  updated: Date;
}

export = IUserDocument;
