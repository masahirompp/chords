import ViewScale = require('./ViewScale')
import SvgStaffDef = require('./../model/SvgStaffDef')

class SvgDefDrawer {

  public static append(viewScale:ViewScale, svgStaffDef:SvgStaffDef) {
    var $defs = d3.select('#score').append('defs');

    $defs.append('g')
      .attr({
        id: svgStaffDef.gClef.id,
        transform: 'translate(0,' + viewScale.calc(svgStaffDef.gClef.offset) + '),scale(' +
                   viewScale.calc(svgStaffDef.gClef.scale) +
                   ')'
      })
      .append('path')
      .attr({
        d: svgStaffDef.gClef.path,
        fill: 'black',
        stroke: 'none'
      });

    $defs.append('g')
      .attr({
        id: svgStaffDef.fClef.id,
        transform: 'scale(' + viewScale.calc(svgStaffDef.fClef.scale) + ')'
      })
      .append('path')
      .attr({
        d: svgStaffDef.fClef.path,
        fill: 'black',
        stroke: 'none'
      });

    var $firstBarDef = $defs.append('g')
      .attr({
        id: 'firstBar'
      });
    $firstBarDef.selectAll('line.staff_line')
      .data(svgStaffDef.getFirstBarDef())
      .enter()
      .append('line')
      .attr({
        x1: (d) => {
          return viewScale.calc(d.x1);
        },
        x2: (d) => {
          return viewScale.calc(d.x2);
        },
        y1: (d) => {
          return viewScale.calc(d.y1);
        },
        y2: (d) => {
          return viewScale.calc(d.y2);
        },
        stroke: 'black',
        class: 'staff_line'
      });
    $firstBarDef.append('use')
      .attr('class', 'clef')
      .attr({
        'xlink:href': '#' + svgStaffDef.clef.id
      });

    $defs.append('g')
      .attr({
        id: 'bar'
      })
      .selectAll('line.staff_line')
      .data(svgStaffDef.getBarDef())
      .enter()
      .append('line')
      .attr({
        x1: (d) => {
          return viewScale.calc(d.x1);
        },
        x2: (d) => {
          return viewScale.calc(d.x2);
        },
        y1: (d) => {
          return viewScale.calc(d.y1);
        },
        y2: (d) => {
          return viewScale.calc(d.y2);
        },
        stroke: 'black',
        class: 'staff_line'
      });
  }
}

export = SvgDefDrawer

