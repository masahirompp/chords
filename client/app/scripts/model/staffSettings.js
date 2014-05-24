define([], function() {
  'use strict';

  // const
  var PAPER_HEIGHT_MILLI = 297;
  var PAPER_WIDTH_MILLI = 210;
  var BASE_LINE_SPACE = 3;
  var BASE_CLEF_WIDTH = 30;

  function StaffSettings() {
    this.margin = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    };
    this.staffSpace = 100;
    this.lineSpace = 3;
    this.underlineSpace = 2;
    this.hasPageNo = true;
    this.staffType = 'staff';
    this.barCount = 4;
    this.musicalTime = 8;
    this.hasClef = true;
    this.hasKey = false;
    this.hasBarNo = false;
  }

  Object.defineProperty(StaffSettings.prototype, 'height', {
    get: function() {
      return PAPER_HEIGHT_MILLI - this.margin.top - this.margin.bottom;
    }
  });

  Object.defineProperty(StaffSettings.prototype, 'width', {
    get: function() {
      return PAPER_WIDTH_MILLI - this.margin.left - this.margin.right;
    }
  });

  Object.defineProperty(StaffSettings.prototype, 'clefWidth', {
    get: function() {
      return BASE_CLEF_WIDTH * (BASE_LINE_SPACE / this.lineSpace);
    }
  });

  return StaffSettings;

});
