define([], function() {
  'use strict';

  // module pattern
  var StaffManager = function(height, width) {

    //=====================
    // private variable
    //=====================
    var _barIndex = 0; // 1...barCount
    var _lineIndex = -1;

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

    var getChordPointXs = function() {
      var base = getStaffPointX();
      if(isFirstBar()){
        base = base + width.clefWidth;
      }
      var points = [];
      for (var i = 0; i < width.musicalTime; i++) {
        points.push(base + width.chordWidth * i);
      }
      return points;
    };

    var getChordPointY = function() {
      return getStaffPointY() - height.underlineSpace;
    };

    return {
      isFirstBar: isFirstBar,
      next: next,
      nextLine: nextLine,
      getStaffPoint: getStaffPoint,
      getChordPoint: getChordPoint
    };

  };

  return StaffManager;

});
