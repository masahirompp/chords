define([], function() {
  'use strict';

  function SvgStaffDef(lineSpace, firstBarWidth, barWidth, staffType) {
    this._lineSpace = lineSpace;
    this._firstBarWidth = firstBarWidth;
    this._barWidth = barWidth;
    this._staffType = staffType;
  }

  SvgStaffDef.prototype.getFirstBarDef = function() {
    var defs = getBarLineDef(this._lineSpace, this._firstBarWidth, this._staffType);
    defs.push({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: this._lineSpace * 4
    });
    defs.push({
      x1: this._firstBarWidth,
      x2: this._firstBarWidth,
      y1: 0,
      y2: this._lineSpace * 4
    });
    return defs;
  };

  SvgStaffDef.prototype.getBarDef = function() {
    var defs = getBarLineDef(this._lineSpace, this._barWidth, this._staffType);
    defs.push({
      x1: this._barWidth,
      x2: this._barWidth,
      y1: 0,
      y2: this._lineSpace * 4
    });
    return defs;
  };

  var getBarLineDef = function(lineSpace, width, staffType) {
    switch (staffType) {
      case 'online':
        return getLineDefOnline(lineSpace, width);
      case 'staff':
        return getLineDefStaff(lineSpace, width);
      case 'grandStaff':
        return getLineDefGrandStaff(lineSpace, width);
    }
  };

  var getLineDefStaff = function(lineSpace, width) {
    var lineDef = [];
    for (var i = 0; i < 5; i++) {
      lineDef.push({
        x1: 0,
        x2: width,
        y1: lineSpace * i,
        y2: lineSpace * i
      });
    }
    return lineDef;
  };

  var getLineDefGrandStaff = function(lineSpace, width) {
    // todo
    return [lineSpace, width];
  };

  var getLineDefOnline = function(lineSpace, width) {
    // todo
    return [lineSpace, width];
  };

  return SvgStaffDef;

});
