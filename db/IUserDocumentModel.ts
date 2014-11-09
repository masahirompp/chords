/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');

interface IUserDocumentModel extends mongoose.Model<IUserDocument> {
  generateHash:(password:string, callback:(err:any, hash:string) => void) => void;
}

export = IUserDocumentModel;
