'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var Author = new Schema({
  email: {type: String, required: true, index: {unique: true}},
  name: {type: String, required: true, index: {unique: true}},
  created: { type: Date, default: Date.now },
  updated: Date
});

Author.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Author.statics.createAuthor = function(email, callback) {

  var Author = mongoose.model('Author'); // self === Author

  Author.findByEmail(email, function(error, author) {
    if(error) {
      return callback(error);
    }
    if(author) {
      return callback(new Error('already registered.'));
    }
    author = new Author({email: email});
    author.save(callback);
  });
};

Author.statics.findByEmail = function(email, callback) {
  this.findOne({email: email}, callback);
};

// スキーマAuthorをAuthorモデルとして登録
// そして、Authorモデルをこのモジュールにexport
module.exports = mongoose.model('Author', Author);
