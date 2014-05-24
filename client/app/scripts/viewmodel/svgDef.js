define([], function() {
  'use strict';
  var d3 = window.d3;

  function SvgDef() {}

  SvgDef.prototype.Init = function(settings, clefDef, staffDef) {

    var $svg = d3.select('#score')
      .append('svg')
      .attr({
        height: settings.height,
        width: settings.width
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

    var $firstBarDef = $defs.append('g')
      .attr({
        id: 'firstBar'
      });
    $firstBarDef.selectAll('line.staff_line')
      .data(staffDef.getFirstBarDef())
      .enter()
      .append('line')
      .attr({
        x1: function(d) {
          return d.x1;
        },
        x2: function(d) {
          return d.x2;
        },
        y1: function(d) {
          return d.y1;
        },
        y2: function(d) {
          return d.y2;
        },
        stroke: 'black',
        class: 'staff_line'
      });
    $firstBarDef.append('use')
      .attr('class', 'clef')
      .attr({
        'xlink:href': '#gCelf'
      });

    $defs.append('g')
      .attr({
        id: 'bar'
      })
      .selectAll('line.staff_line')
      .data(staffDef.getBarDef())
      .enter()
      .append('line')
      .attr({
        x1: function(d) {
          return d.x1;
        },
        x2: function(d) {
          return d.x2;
        },
        y1: function(d) {
          return d.y1;
        },
        y2: function(d) {
          return d.y2;
        },
        stroke: 'black',
        class: 'staff_line'
      });

    return this;
  };

  return SvgDef;

});
