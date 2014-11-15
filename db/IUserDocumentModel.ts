/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');

interface IUserDocumentModel extends mongoose.Model < IUserDocument > {
  findOrCreate: (provider: string, id: string) => Q.Promise < IUserDocument > ;
}

export = IUserDocumentModel;