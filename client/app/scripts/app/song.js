define(['jquery',
  'model/chords',
  'model/staffSettings',
  'model/staffManager',
  'viewmodel/staffDrawer'
], function($, Chords, StaffSettings, StaffManager, StaffDrawer) {
  'use strict';

  var songId = 20; // urlからsongIdを取得する
  var settings = new StaffSettings(); //nownow

  var chords = new Chords(songId);
  var manager = new StaffManager(settings.getDefault(), true);
  var drawer = new StaffDrawer(chords, manager);
  drawer.Init();

  return false;

});
