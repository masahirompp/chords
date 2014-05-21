define([], function() {
  'use strict';
  var d3 = window.d3;

  function StaffDrawer(chords, staff) {
    this._chords = chords;
    this._staff = staff;
    return this;
  }

  StaffDrawer.prototype.Init = function() {
    var paper = this._staff.getPaper();
    var clefDef = this._staff.getClefDef();
    //var staffDef = this._staff.getStaffDef();

    var $svg = d3.select('#score')
      .append('svg').attr({
        height: paper.height,
        width: paper.width
      });

    var $defs = $svg.append('defs');

    $defs.append('g')
      .attr({
        id: 'gCelf',
        transform: 'translate(0,' + clefDef.G_CLEF.OFFSET + '),scale(' + clefDef.G_CLEF.SCALE + ')'
      })
      .append('path')
      .attr({
        d: clefDef.G_CLEF.PATH,
        fill: 'black',
        stroke: 'none'
      });

    $defs.append('g')
      .attr({
        id: 'fCelf',
        transform: 'scale(' + clefDef.F_CLEF.SCALE + ')'
      })
      .append('path')
      .attr({
        d: clefDef.F_CLEF.PATH,
        fill: 'black',
        stroke: 'none'
      });

    $defs.append('g')
      .attr({
        id: 'firstBar'
      });

    $defs.append('g')
      .attr({
        id: 'bar'
      });

    return this;
  };

  return StaffDrawer;

});
