/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');
import IUserDocumentModel = require('IUserDocumentModel');

var UserSchema: mongoose.Schema = new mongoose.Schema({
  provider: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    require: true
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

UserSchema.static('findOrCreate', (provider: string, id: string): Q.Promise < IUserDocument > => {

  return Q.promise < IUserDocument > ((resolve, reject) => {
    UserDocumentModel.findOne({
        provider: provider,
        id: id
      })
      .exec()
      .then(user => {
        if (user) {
          resolve(user);
          return;
        }
        UserDocumentModel.create({
            provider: provider,
            id: id
          })
          .onFulfill(users => {
            resolve(users[0]);
          })
          .onReject(err => {
            reject(err)
          });

        //user.save((err, user) => {
        //  if (err) {
        //    reject(err);
        //    return;
        //  }
        //  resolve(user);
        //});
      });
  });
});

var UserDocumentModel: IUserDocumentModel = < IUserDocumentModel > mongoose.model('User', UserSchema);

export = UserDocumentModel;
