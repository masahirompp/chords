define([], function() {
  'use strict';
  var d3 = window.d3;

  function StaffDrawer(chords, pointer) {
    this._chords = chords;
    this._pointer = pointer;
  }

  StaffDrawer.prototype.draw = function() {
    var $svg = d3.select('#score');
    var pointer = this._pointer;
    for (var i = 0; i < this._chords.count(); i++) {
      pointer.next();
      $svg.append('use')
        .attr(createAttr(pointer));
    }
  };

  var createAttr = function(pointer) {
    var point = pointer.getStaffPoint();
    var link = pointer.isFirstBar() ? '#firstBar' : '#bar';
    return {
      'xlink:href': link,
      x: point.x,
      y: point.y
    };
  };

  return StaffDrawer;

});
