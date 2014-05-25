'use strict';

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/chord';
var db = mongoose.createConnection(uri, function(err, res) {
  if (err) {
    console.log('Error connected: ' + uri + ' - ' + err);
  } else {
    console.log('Success connected: ' + uri);
  }
  console.dir(res);
});

// define
var userSchema = new mongoose.Schema({
  userID: String,
  name: String,
  email: String,
  created: Date,
  updated: Date
});
exports.User = db.model('User', userSchema);

var artistSchema = new mongoose.Schema({
  artistID: String,
  name: String,
  url: String,
  created: Date,
  updated: Date
});
exports.Artist = db.model('Artist', artistSchema);
