define([], function() {
  'use strict';
  var d3 = window.d3;

  function StaffDrawer(settings, chords, staff) {
    this._settings = settings;
    this._chords = chords;
    this._staff = staff;
    return this;
  }

  StaffDrawer.prototype.Init = function(clefDef, staffDef) {

    console.log(staffDef);

    var $svg = d3.select('#score')
      .append('svg')
      .attr({
        height: this._settings.height,
        width: this._settings.width
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
