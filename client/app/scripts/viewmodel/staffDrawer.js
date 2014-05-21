define(['d3'], function(d3) {
  'use strict';

  function StaffDrawer (chords, staff) {
    this._chords = chords;
    this._staff = staff;
    return this;
  }

  StaffDrawer.prototype.Init = function(){

  }

  return StaffDrawer;

});
