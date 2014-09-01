'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var Author = new Schema({
  email: String,
  name: {type: String, required: true, index: {unique: true}},
  created: { type: Date, default: Date.now },
  updated: Date
});

Author.pre('save', function(next) {
  this.updated = new Date();
  next();
});

Author.statics.createAuthor = function(name, email, callback) {

  var Author = mongoose.model('Author');

  Author.findByName(name, function(error, author) {
    if(error) {
      return callback(error);
    }
    if(author) {
      return callback(new Error('already registered.'));
    }
    author = new Author({name: name, email: email});
    author.save(callback);
  });
};

Author.statics.findByName = function(name, callback) {
  this.findOne({name: name}, callback);
};

module.exports = mongoose.model('Author', Author);
