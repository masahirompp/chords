define([], function() {
  'use strict';
  var d3 = window.d3;

  function SvgDef() {}

  SvgDef.prototype.Init = function(settings, scale, clefDef, staffDef) {

    var $defs = d3.select('#score')
      .append('defs');
    var ratio = settings.lineSpace / settings.BASE_LINE_SPACE;
    var xScale = scale.getD3Scale();

    $defs.append('g')
      .attr({
        id: 'gClef',
        transform: 'translate(0,' + xScale(clefDef.G_CLEF.OFFSET * ratio) + '),scale(' + xScale(clefDef.G_CLEF.SCALE * ratio) + ')'
      })
      .append('path')
      .attr({
        d: clefDef.G_CLEF.PATH,
        fill: 'black',
        stroke: 'none'
      });

    $defs.append('g')
      .attr({
        id: 'fClef',
        transform: 'scale(' + xScale(clefDef.F_CLEF.SCALE * ratio) + ')'
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
          return xScale(d.x1);
        },
        x2: function(d) {
          return xScale(d.x2);
        },
        y1: function(d) {
          return xScale(d.y1);
        },
        y2: function(d) {
          return xScale(d.y2);
        },
        stroke: 'black',
        class: 'staff_line'
      });
    $firstBarDef.append('use')
      .attr('class', 'clef')
      .attr({
        'xlink:href': '#' + settings.clef
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
          return xScale(d.x1);
        },
        x2: function(d) {
          return xScale(d.x2);
        },
        y1: function(d) {
          return xScale(d.y1);
        },
        y2: function(d) {
          return xScale(d.y2);
        },
        stroke: 'black',
        class: 'staff_line'
      });

    return this;
  };

  return SvgDef;

});
