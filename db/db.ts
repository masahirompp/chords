/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import AuthorDocumentModel = require('./AuthorDocumentModel');
import ScoreDocumentModel = require('./ScoreDocumentModel');
import ChordDocumentModel = require('./ChordDocumentModel');
import IAuthorDocumentModel = require('./IAuthorDocumentModel');
import IScoreDocumentModel = require('./IScoreDocumentModel');
import IChordDocumentModel = require('./IChordDocumentModel');
import ClientErrorDocumentModel = require('./ClientErrorDocumentModel');

class db {

  static connect(db: string) {
    mongoose.connect('mongodb://' + db);
  }

  static debug(debug: any) {
    mongoose.set('debug', debug);
  }

  static get Author(): IAuthorDocumentModel {
    return <IAuthorDocumentModel > AuthorDocumentModel;
  }

  static get Score(): IScoreDocumentModel {
    return <IScoreDocumentModel > ScoreDocumentModel;
  }

  static get Chord(): IChordDocumentModel {
    return <IChordDocumentModel > ChordDocumentModel;
  }

  static get ClientError(): mongoose.Model < any > {
    return ClientErrorDocumentModel;
  }
}

export = db;