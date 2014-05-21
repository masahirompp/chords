define(['jquery', 'model/chords'], function($, Chords) {
  'use strict';

  console.log('Running jQuery %s', $()
    .jquery);
  console.log('song.js');

  // urlからsongIdを取得する
  var songId = 20;
  var chords = new Chords(songId);

  return false;

});
