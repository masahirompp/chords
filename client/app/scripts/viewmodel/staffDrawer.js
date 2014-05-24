define([], function() {
  'use strict';
  //var d3 = window.d3;

  function StaffDrawer(chords, pointer) {
    this._chords = chords;
    this._pointer = pointer;
  }

  StaffDrawer.prototype.draw = function() {};

  return StaffDrawer;

});
