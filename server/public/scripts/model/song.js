define([], function() {
  'use strict';

  function Song(userID, songID, title, composer) {
    this.userID = userID;
    this.songID = songID;
    this.title = title;
    this.composer = composer;
  }

  return Song;

});
