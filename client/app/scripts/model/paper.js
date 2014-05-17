define([], function() {
  'use strict';

  // const
  var PAPER_HEIGHT_MILLI = 297;
  var PAPER_WIDTH_MILLI = 210;

  function Paper(margin) {
    this._margin = margin;
    this._height = PAPER_HEIGHT_MILLI - this._margin.top - this._margin.bottom;
    this._width = PAPER_WIDTH_MILLI - this._margin.left - this._margin.right;
  }

  Object.defineProperty(Paper.prototype, 'margin', {
    get: function() {
      return this._margin;
    }
  });

  Object.defineProperty(Paper.prototype, 'height', {
    get: function() {
      return this._height;
    }
  });

  Object.defineProperty(Paper.prototype, 'width', {
    get: function() {
      return this._width;
    }
  });

  return Paper;

});
