define(['model/paper', 'model/point'], function(Paper, Point) {
  'use strict';

  function StaffManager(songSettings, staffSettings, textSettings, chords) {
    this._settings = {
      song: songSettings,
      staff: staffSettings,
      text: textSettings
    };
    this._chords = chords;

    // instance
    this._paper = new Paper(staffSettings.margin);
    this._point = new Point(this._paper, staffSettings); // nownow

    init();

  }

  StaffManager.prototype.updateSongSettings = function(settings) {
    this._settings.song = settings;
  };
  StaffManager.prototype.updateStaffSettings = function(settings) {
    this._settings.staff = settings;
  };
  StaffManager.prototype.updateTextSettings = function(settings) {
    this._settings.text = settings;
  };
  StaffManager.prototype.update = function(chords) {
    this._chords = chords;
  };

  var init = function() {

  };

  return StaffManager;

});
