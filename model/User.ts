import db = require('../db/db');
import Author = require('./Author');
import IUserDocument = require('../db/IUserDocument');
import IContact = require('../db/IContact');

class User {

  static findOrCreate = (profile: IContact): Q.Promise < IUserDocument > => {
    return db.User.findOrCreate(profile);
  };

  static findById = (id: string): Q.Promise < IUserDocument > => {
    return Q.promise < IUserDocument > ((resolve, reject) => {
      db.User.findById(id)
        .exec()
        .onFulfill(user => {
          resolve(user);
        })
        .onReject(err => {
          reject(err);
        });
    });
  }

}

export = User;
