(function(define) {
  'use strict';

  define(['const/const'], function(CONST) {

    /**
     * [Paper description]
     * @param {Number} marginTopMilli    [description]
     * @param {Number} marginBottomMilli [description]
     * @param {Number} marginLeftMilli   [description]
     * @param {Number} marginRightMilli  [description]
     */

    function Paper(marginTopMilli, marginBottomMilli, marginLeftMilli, marginRightMilli) {

      this._margin = {
        top: marginTopMilli,
        bottom: marginBottomMilli,
        left: marginLeftMilli,
        right: marginRightMilli
      };

      this._height = CONST.PAPER_HEIGHT_MILLI - this._margin.top - this._margin.bottom;
      this._width = CONST.PAPER_WIDTH_MILLI - this._margin.left - this._margin.right;
    }

    Object.defineProperty(Paper, 'margin', {
      get: function() {
        return this._margin;
      }
    });

    Object.defineProperty(Paper, 'height', {
      get: function() {
        return this._height;
      }
    });

    Object.defineProperty(Paper, 'width', {
      get: function() {
        return this._width;
      }
    });

    return Paper;

  });
})(this.define);
