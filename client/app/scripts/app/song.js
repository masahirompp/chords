define(['jquery',
  'model/chords',
  'model/staffSettings',
  'model/staffManager'
], function($, Chords, StaffSettings, StaffManager) {
  'use strict';

  var songId = 20; // urlからsongIdを取得する
  var settings = StaffSettings(); //nownow

  var chords = new Chords(songId);
  var manager = new StaffManager(settings, true);

  return false;

});
