define([], function() {
  'use strict';

  function StaffHeight(height, staffSpace, lineSpace, underlineSpace, staffType, hasTitle, hasPageNo) {
    this._height = height;
    this._staffSpace = staffSpace;
    this._lineSpace = lineSpace;
    this._underlineSpace = underlineSpace;
    this._staffType = staffType;
    this._hasTitle = hasTitle;
    this._hasPageNo = hasPageNo;
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

  Object.defineProperty(StaffHeight.prototype, 'staffType', {
    get: function() {
      return this._staffType;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'hasTitle', {
    get: function() {
      return this._hasTitle;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'hasPageNo', {
    get: function() {
      return this._hasPageNo;
    }
  });

  return StaffHeight;

});
