/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IAuthorDocument = require('IAuthorDocument');

interface IAuthorDocumentModel extends mongoose.Model<IAuthorDocument> {
  findByName:(name:string) => Q.Promise<IAuthorDocument>;
  createNewAuthor:(name:string, email?:string) => Q.Promise<IAuthorDocument>;
}

export = IAuthorDocumentModel;
