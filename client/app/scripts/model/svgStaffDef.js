define([], function() {
  'use strict';

  function SvgStaffDef(lineSpace, firstBarWidth, barWidth, staffType) {
    this._lineSpace = lineSpace;
    this._firstBarWidth = firstBarWidth;
    this._barWidth = barWidth;
    this._staffType = staffType;
  }

  Object.defineProperty(SvgStaffDef.prototype, 'lineSpace', {
    get: function() {
      return this._lineSpace;
    }
  });

  Object.defineProperty(SvgStaffDef.prototype, 'firstBarWidth', {
    get: function() {
      return this._firstBarWidth;
    }
  });

  Object.defineProperty(SvgStaffDef.prototype, 'barWidth', {
    get: function() {
      return this._barWidth;
    }
  });

  Object.defineProperty(SvgStaffDef.prototype, 'staffType', {
    get: function() {
      return this._staffType;
    }
  });

});
