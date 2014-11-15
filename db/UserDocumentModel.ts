/// <reference path="../tsd/tsd.d.ts" />

import mongoose = require('mongoose');
import IUserDocument = require('IUserDocument');
import IUserDocumentModel = require('IUserDocumentModel');
import IContact = require('IContact');

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
    ref: 'Author'
  },
  displayName: {
    type: String
  },
  emails: {
    type: mongoose.Schema.Types.Mixed
  },
  photos: {
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

UserSchema.static('findOrCreate', (profile: IContact): Q.Promise < IUserDocument > => {

  return Q.promise < IUserDocument > ((resolve, reject) => {
    UserDocumentModel.findOne({
        provider: profile.provider,
        id: profile.id
      })
      .exec()
      .then(user => {
        if (user) {
          return resolve(user);
        }
        UserDocumentModel.create({
            provider: profile.provider,
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails,
            photos: profile.photos
          })
          .onFulfill(user => {
            resolve(user);
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
