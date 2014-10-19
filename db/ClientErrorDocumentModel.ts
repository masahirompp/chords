/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');

var ClientErrorSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed
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

var ClientErrorDocumentModel: mongoose.Model < any > = < mongoose.Model < any >> mongoose.model('ClientError', ClientErrorSchema);

export = ClientErrorDocumentModel;