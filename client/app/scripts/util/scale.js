define([], function() {
  'use strict';
  var d3 = window.d3;

  function Scale(original, target) {
    this._original = original;
    this._target = target;
  }

  Scale.prototype.getD3Scale = function() {
    return d3.scale.linear()
      .domain([0, this._original])
      .range([0, this._target]);
  };

  return Scale;
});
