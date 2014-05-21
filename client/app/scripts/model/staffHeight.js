define([], function() {
  'use strict';

  // nownow
  var titleSpace = 20;
  var firstChordSpace = 20;

  function StaffHeight(height, staffSpace, lineSpace, underlineSpace, printMode, hasPageNo, staffType) {
    this._height = height;
    this._staffSpace = staffSpace;
    this._lineSpace = lineSpace;
    this._underlineSpace = underlineSpace;
    this._printMode = printMode;
    this._hasPageNo = hasPageNo;
    this._staffType = staffType ? staffType : 'staff';

    // 最初の五線譜までの距離
    this._offsetTop = firstChordSpace + (printMode ? titleSpace : 0);

    // 五線部分の高さ
    this._staffHeight = (function(type) {
      switch (type) {
        case 'online':
        case 'staff':
        case 'grandStaff':
          return lineSpace * 4;
      }
    })(staffType);

    // 五線から次の五線までの距離
    this._staffLineHeight = this._staffHeight + this._staffSpace;
  }

  /**
   * ==============================
   * getter
   * ==============================
   */
  Object.defineProperty(StaffHeight.prototype, 'offsetTop', {
    get: function() {
      return this._offsetTop;
    }
  });

  Object.defineProperty(StaffHeight.prototype, 'staffLineHeight', {
    get: function() {
      return this._staffLineHeight;
    }
  });

  return StaffHeight;

});
