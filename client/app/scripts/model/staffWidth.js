(function(define) {
  'use strict';

  define([], function() {

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
