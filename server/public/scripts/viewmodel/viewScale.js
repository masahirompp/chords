define([], function() {
  'use strict';
  var $ = window.jQuery;

  function ViewScale(settings) {
    this._width = settings.width;
    this._height = settings.height;
    this._ratio = 1;
    this._viewWidth = settings.width;
    this._viewHeight = settings.height;
    this.resize();
  }

  ViewScale.prototype.resize = function() {
    this._load();
    this._applyView();
    return this;
  };

  ViewScale.prototype._load = function(){
    this._viewWidth = $('.content')
      .width();
    this._ratio = this._viewWidth / this._width;
    this._viewHeight = Math.ceil(this._height * this._ratio);
  };

  ViewScale.prototype._applyView = function(){
    $('#score')
      .attr({
        width: this._viewWidth,
        height: this._viewHeight
      });
  };

  Object.defineProperty(ViewScale.prototype, 'viewWidth', {
    get: function() {
      return this._viewWidth;
    }
  });

  Object.defineProperty(ViewScale.prototype, 'viewHeight', {
    get: function() {
      return this._viewHeight;
    }
  });

  Object.defineProperty(ViewScale.prototype, 'ratio', {
    get: function() {
      return this._ratio;
    }
  });

  return ViewScale;

});
