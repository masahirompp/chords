define([], function() {
  'use strict';
  var d3 = window.d3;

  function StaffDrawer(scale, chords, pointer) {
    this._scale = scale;
    this._chords = chords;
    this._pointer = pointer;
  }

  StaffDrawer.prototype.draw = function() {

    var $svg = d3.select('#score');
    var pointer = this._pointer;

    var xScale = this._scale.getD3Scale();
    var ratio = this._scale.ratio;

    for (var i = 0; i < this._chords.count(); i++) {
      pointer.next();
      var point = pointer.getStaffPoint();
      $svg.append('use')
        .attr({
          'xlink:href': pointer.isFirstBar() ? '#firstBar' : '#bar',
          x: xScale(point.x),
          y: xScale(point.y)
        });
    }
  };

  return StaffDrawer;

});
