(function(define) {
  'use strict';

  define(['const/const'], function(CONST) {

    function Paper(marginTopMilli, marginBottomMilli, marginLeftMilli, marginRightMilli) {

      // 余白
      this.margin = {
        top: marginTopMilli,
        bottom: marginBottomMilli,
        left: marginLeftMilli,
        right: marginRightMilli
      };

      // 描画領域
      this.width = CONST.PAPER_WIDTH_MILLI - left - right;
      this.height = CONST.PAPER_HEIGHT_MILLI - top - bottom;

    }

    return Paper;

  });
})(this.define);
