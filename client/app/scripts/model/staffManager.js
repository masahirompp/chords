define(['model/paper',
  'model/staffHeight',
  'model/staffWidth',
  'model/svgClefDefs',
  'model/svgStaffDefs'
], function(Paper, Height, Width, ClefDefs, StaffDefs) {
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
    this._clefDefs = new ClefDefs(staffSettings.lineSpace);

    this._height = new Height(
      this._paper.height,
      staffSettings.staffSpace,
      staffSettings.lineSpace,
      staffSettings.underlineSpace,
      staffSettings.printMode,
      staffSettings.hasPageNo,
      staffSettings.staffType);

    this._width = new Width(
      this._paper.width,
      this._clefDefs.width,
      staffSettings.barCount,
      staffSettings.musicalTime,
      staffSettings.hasClef,
      staffSettings.hasKey,
      staffSettings.hasBarNo);

    this._staffDefs = new StaffDefs(
      staffSettings.lineSpace,
      this._width.firstBarWidth,
      this._width.barWidth,
      staffSettings.staffType);

    // variable
    this._index = 0;

    // initialize
    init();
  }

  //=====================
  // public property
  //=====================
  Object.defineProperty(StaffManager.prototype, 'clefDefs', {
    get: function() {
      return this._clefDefs;
    }
  });

  Object.defineProperty(StaffManager.prototype, 'staffDefs', {
    get: function() {
      return this._staffDefs;
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
  var init = function() {};

  return StaffManager;

});
