'use strict';
var db = require('../db');

/**
 *
 * @param authorDoc mongoDB Document
 * @constructor
 */
var Author = function(authorDoc) {
  this._author = authorDoc;
};

/**
 * Getter
 */
Object.defineProperty(Author.prototype, 'name', {
  get: function() {
    return this._author.name;
  }
});

Object.defineProperty(Author.prototype, 'isValid', {
  get: function() {
    return !!this._author;
  }
});

/**
 * public static
 * @param authorid
 * @param callback
 */
Author.getById = function(authorid, callback) {
  db.Author.findById(authorid, function(err, author) {
    if(err) {
      return callback(err);
    }
    if(!author) {
      return callback(new Error('not found author.'));
    }
    callback(null, author);
  });
};

module.exports = Author;
