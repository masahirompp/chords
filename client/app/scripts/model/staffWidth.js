define([], function() {
  'use strict';

  function StaffWidth(width, barCount, musicalTime, hasClef, hasKey, hasBarNo) {
    this._width = width;
    this._barCount = barCount;
    this._musicalTime = musicalTime;
    this._hasClef = hasClef;
    this._hasKey = hasKey;
    this._hasBarNo = hasBarNo;

    // const nownow
    this._clefWidth = 10;
    this._keyWidth = 0;
    this._barNoWidth = 1;

    // calculated
    this._paddingLeft = (hasClef ? this._clefWidth : 0) + (hasKey ? this._keyWidth : 0);
    this._barWidth = (width - this._paddingLeft) / barCount;
    this._firstBarWidth = this._paddingLeft + this._barWidth;
    this._chordWidth = this._barWidth / musicalTime;

  }

  /**
   * ==============================
   * getter
   * ==============================
   */
  Object.defineProperty(StaffWidth.prototype, 'barCount', {
    get: function() {
      return this._barCount;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'musicalTime', {
    get: function() {
      return this._musicalTime;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'hasClef', {
    get: function() {
      return this._hasClef;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'hasKey', {
    get: function() {
      return this._hasKey;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'hasBarNo', {
    get: function() {
      return this._hasBarNo;
    }
  });

  return StaffWidth;

});
