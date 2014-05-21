define(['model/paper',
  'model/staffHeight',
  'model/staffWidth',
  'model/svgClefDef',
  'model/svgStaffDef'
], function(Paper, Height, Width, ClefDef, StaffDef) {
  'use strict';

  // module pattern
  var StaffManager = function(staffSettings, printMode) {

    //=====================
    // readonly
    //=====================
    var paper = new Paper(staffSettings.margin);
    var clefDef = new ClefDef(staffSettings.lineSpace);

    var height = new Height(
      paper.height,
      staffSettings.staffSpace,
      staffSettings.lineSpace,
      staffSettings.underlineSpace,
      printMode,
      staffSettings.hasPageNo,
      staffSettings.staffType);

    var width = new Width(
      paper.width,
      clefDef.width,
      staffSettings.barCount,
      staffSettings.musicalTime,
      staffSettings.hasClef,
      staffSettings.hasKey,
      staffSettings.hasBarNo);

    var staffDef = new StaffDef(
      staffSettings.lineSpace,
      width.firstBarWidth,
      width.barWidth,
      staffSettings.staffType);

    //=====================
    // private variable
    //=====================
    var _barIndex = 1; // 1...barCount
    var _lineIndex = 0;

    //=====================
    // function
    //=====================
    var isFirstBar = function() {
      return _barIndex === 1;
    };

    var next = function() {
      if (_barIndex % width.barCount === 0) {
        _barIndex = 1;
        _lineIndex++;
      } else {
        _barIndex++;
      }
    };

    var nextLine = function() {
      if (_barIndex !== 1) {
        _barIndex = 1;
        _lineIndex++;
      }
    };

    var getStaffPoint = function() {
      return {
        x: getStaffPointX(),
        y: getStaffPointY()
      };
    };

    var getChordPoint = function() {
      return {
        xs: getChordPointXs(),
        y: getChordPointY()
      };
    };

    var getStaffPointX = function() {
      if (isFirstBar()) {
        return 0;
      }
      return width.firstBarWidth + (width.barWidth * (_barIndex - 2));
    };

    var getStaffPointY = function() {
      return height.offsetTop + (height.staffLineHeight * _lineIndex);
    };

    var getChordPointXs = function() {};
    var getChordPointY = function() {};

    return {
      getClefDef: function() {
        return clefDef;
      },
      getStaffDef: function() {
        return staffDef;
      },
      isFirstBar: isFirstBar,
      next: next,
      nextLine: nextLine,
      getStaffPoint: getStaffPoint,
      getChordPoint: getChordPoint
    };

  };

  return StaffManager;

});
