import db = require('../db/db');
import Author = require('./Author');
import IUserDocument = require('../db/IUserDocument');
import IContact = require('../db/IContact');

class User {

  static findOrCreate = (profile: IContact): Q.Promise < IUserDocument > => {
    return db.User.findOrCreate(profile.provider, profile.id)
  };

}
