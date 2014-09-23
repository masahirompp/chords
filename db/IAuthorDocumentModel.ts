/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import IAuthorDocument = require('IAuthorDocument');

interface IAuthorDocumentModel extends mongoose.Model<IAuthorDocument> {
  findByName:(name:string, callback:(err:any, author:IAuthorDocument)=>void)=>void;
  createNewAuthor:(name:string, email:string, callback:(err:any, result:IAuthorDocument)=>void)=>void;
}

export = IAuthorDocumentModel;
