define(['model/paper', 'model/staffHeight', 'model/staffWidth', 'model/svgDefs'], function(Paper, Height, Width, Defs) {
  'use strict';

  function StaffManager(songSettings, staffSettings, textSettings, printMode) {

    // readonly
    this._settings = {
      song: songSettings,
      staff: staffSettings,
      text: textSettings
    };
    this._printMode = printMode;
    this._paper = new Paper(staffSettings.margin);
    this._height = new Height(this._paper.height, staffSettings.staffSpace, staffSettings.lineSpace, staffSettings.underlineSpace, staffSettings.printMode, staffSettings.hasPageNo, staffSettings.staffType);
    this._width = new Width(this._paper.width, staffSettings.barCount, staffSettings.musicalTime, staffSettings.hasClef, staffSettings.hasKey, staffSettings.hasBarNo);
    this._svgDefs = new Defs();

    // variable
    this._index = 0;

    // initialize
    init();
  }

  //=====================
  // public property
  //=====================
  Object.defineProperty(StaffManager.prototype, 'svgDefs', {
    get: function() {
      return this._svgDefs;
    }
  });

  //=====================
  // public function
  //=====================
  StaffManager.prototype.next = function() {};
  StaffManager.prototype.nextLine = function() {};
  StaffManager.prototype.getStaffPoint = function() {};
  StaffManager.prototype.getChordPoint = function() {};

  //=====================
  // private
  //=====================
  var init = function() {}

  return StaffManager;

});
