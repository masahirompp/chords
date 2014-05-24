define([], function() {
  'use strict';

  // const
  var HEIGHT = 297; //A4 based
  var WIDTH = 210;  //A4 based
  var BASE_CLEF_WIDTH = 14;
  var BASE_LINE_SPACE = 3;

  function StaffSettings() {
    this.staffSpace = 20;
    this.lineSpace = 2;
    this.underlineSpace = 2;
    this.hasPageNo = true;
    this.staffType = 'staff';
    this.barCount = 4;
    this.musicalTime = 8;
    this.hasClef = true;
    this.clef = 'gClef';
    this.hasKey = false;
    this.hasBarNo = false;
  }

  Object.defineProperty(StaffSettings.prototype, 'height', {
    get: function() {
      return HEIGHT;
    }
  });

  Object.defineProperty(StaffSettings.prototype, 'width', {
    get: function() {
      return WIDTH;
    }
  });

  Object.defineProperty(StaffSettings.prototype, 'clefWidth', {
    get: function() {
      return BASE_CLEF_WIDTH;
    }
  });

  Object.defineProperty(StaffSettings.prototype, 'BASE_LINE_SPACE', {
    get: function() {
      return BASE_LINE_SPACE;
    }
  });

  return StaffSettings;

});
