define([], function() {
  'use strict';

  function StaffWidth(width, clefWidth, barCount, musicalTime, hasClef, hasKey, hasBarNo) {
    this._width = width;
    this._clefWidth = clefWidth;
    this._barCount = barCount;
    this._musicalTime = musicalTime;
    this._hasClef = hasClef;
    this._hasKey = hasKey;
    this._hasBarNo = hasBarNo;

    // nownow
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

  Object.defineProperty(StaffWidth.prototype, 'barWidth', {
    get: function() {
      return this._barWidth;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'firstBarWidth', {
    get: function() {
      return this._firstBarWidth;
    }
  });

  Object.defineProperty(StaffWidth.prototype, 'chordWidth', {
    get: function() {
      return this._chordWidth;
    }
  });

  return StaffWidth;

});
