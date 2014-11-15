/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');
import IContact = require('IContact');

interface IUserDocumentModel extends mongoose.Model < IUserDocument > {
  findOrCreate: (profile: IContact) => Q.Promise < IUserDocument > ;
}

export = IUserDocumentModel;
