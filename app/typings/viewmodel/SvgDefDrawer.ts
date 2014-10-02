import StaffSettings = require('./../model/StaffSettings')
import Scale = require('./../util/Scale')
import Clef = require('./../model/Clef')
import SvgStaffDef = require('./../model/SvgStaffDef')

class SvgDefDrawer {

  public static append(settings:StaffSettings, scale:Scale, clef:Clef, staffDef:SvgStaffDef) {
    var $defs:D3.Selection = d3.select('#score').append('defs');
    var ratio:number = settings.lineSpace / settings.BASE_LINE_SPACE;

    $defs.append('g')
      .attr({
              id: Clef.GClef.id,
              transform: 'translate(0,' + scale.calc(clef.offset * ratio) + '),scale(' + scale.calc(clef.scale * ratio) +')'
            })
      .append('path')
      .attr({
              d: clef.path,
              fill: 'black',
              stroke: 'none'
            });

    $defs.append('g')
      .attr({
              id: Clef.FClef.id,
              transform: 'scale(' + scale.calc(clef.scale * ratio) + ')'
            })
      .append('path')
      .attr({
              d: clef.path,
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
                return scale.calc(d.x1);
              },
              x2: function(d) {
                return scale.calc(d.x2);
              },
              y1: function(d) {
                return scale.calc(d.y1);
              },
              y2: function(d) {
                return scale.calc(d.y2);
              },
              stroke: 'black',
              class: 'staff_line'
            });
    $firstBarDef.append('use')
      .attr('class', 'clef')
      .attr({
              'xlink:href': '#' + clef.id
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
                return scale.calc(d.x1);
              },
              x2: function(d) {
                return scale.calc(d.x2);
              },
              y1: function(d) {
                return scale.calc(d.y1);
              },
              y2: function(d) {
                return scale.calc(d.y2);
              },
              stroke: 'black',
              class: 'staff_line'
            });
  }
}

export = SvgDefDrawer

