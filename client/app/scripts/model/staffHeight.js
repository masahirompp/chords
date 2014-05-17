define([], function() {
  'use strict';

  function StaffHeight(height, staffSpace, lineSpace, underlineSpace, printMode, hasPageNo, staffType) {
    this._height = height;
    this._staffSpace = staffSpace;
    this._lineSpace = lineSpace;
    this._underlineSpace = underlineSpace;
    this._printMode = printMode;
    this._hasPageNo = hasPageNo;
    this._staffType = staffType ? staffType : 'staff';
  }

  Object.defineProperty(StaffHeight.prototype, 'height', {
    get: function() {
      return this._height;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'staffSpace', {
    get: function() {
      return this._staffSpace;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'lineSpace', {
    get: function() {
      return this._lineSpace;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'underlineSpace', {
    get: function() {
      return this._underlineSpace;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'printMode', {
    get: function() {
      return this._printMode;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'staffType', {
    get: function() {
      return this._staffType;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'hasPageNo', {
    get: function() {
      return this._hasPageNo;
    }
  });

  return StaffHeight;

});
