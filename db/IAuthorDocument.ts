/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

interface IAuthorDocument extends mongoose.Document {
  email: string;
  name: string;
  created: Date;
  updated: Date;
}

export = IAuthorDocument;
