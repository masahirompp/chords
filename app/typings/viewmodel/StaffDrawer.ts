import BarPoint = require('./../interface/IBarPoint')
import ChordPoint = require('./../interface/IChordPoint')
import ViewScale = require('./ViewScale')
import D3Model = require('./../model/D3Model')

class StaffDrawer {

  public static draw(viewScale:ViewScale, d3model:D3Model) {
    var $svg:D3.Selection = d3.select('#score');
    var staffData:BarPoint[] = d3model.barPoints;
    var chordData:ChordPoint[] = d3model.chordPoints;

    $svg.selectAll('use.bar')
      .data(staffData)
      .enter()
      .append('use')
      .attr({
        x: function(d) {
          return viewScale.calc(d.x);
        },
        y: function(d) {
          return viewScale.calc(d.y);
        },
        'xlink:href': function(d) {
          return d.link;
        },
        class: 'bar'
      });

    $svg.selectAll('text.chord')
      .data(chordData)
      .enter()
      .append('text')
      .attr({
        x: function(d) {
          return viewScale.calc(d.x);
        },
        y: function(d) {
          return viewScale.calc(d.y);
        },
        class: 'chord'
      })
      .text(function(d) {
        return d.chord;
      });

  }
}

export  = StaffDrawer
