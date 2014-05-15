(function(define) {
  'use strict';

  define([], function() {

    /**
     * [StaffWidth description]
     * @param {Number}  width       [description]
     * @param {Number}  clefWidth   [description]
     * @param {Number}  barCount    [description]
     * @param {Number}  musicalTime [description]
     * @param {Boolean} hasClef     [description]
     * @param {Boolean} hasKey      [description]
     * @param {Boolean} hasBarNo    [description]
     */

    function StaffWidth(width, clefWidth, barCount, musicalTime, hasClef, hasKey, hasBarNo) {
      this.width = width;
      this.clefWidth = clefWidth;
      this.barCount = barCount;
      this.musicalTime = musicalTime;
      this.hasClef = hasClef;
      this.hasKey = hasKey;
      this.hasBarNo = hasBarNo;
    }


    return StaffWidth;

  });
})(this.define);
