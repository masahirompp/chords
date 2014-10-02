import BarPoint = require('./../interface/IBarPoint')
import ChordPoint = require('./../interface/IChordPoint')
import Scale = require('./../util/Scale')
import D3Model = require('./../model/D3Model')

class StaffDrawer {

  public static draw(scale:Scale, d3model:D3Model) {
    var $svg:D3.Selection = d3.select('#score');
    var staffData:BarPoint[] = d3model.barPoints;
    var chordData:ChordPoint[] = d3model.chordPoints;

    $svg.selectAll('use.bar')
      .data(staffData)
      .enter()
      .append('use')
      .attr({
              x: function(d) {
                return scale.calc(d.x);
              },
              y: function(d) {
                return scale.calc(d.y);
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
                return scale.calc(d.x);
              },
              y: function(d) {
                return scale.calc(d.y);
              },
              class: 'chord'
            })
      .text(function(d) {
              return d.chord;
            });

  }
}

export  = StaffDrawer
