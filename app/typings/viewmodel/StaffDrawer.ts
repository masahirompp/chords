import BarPoint = require('./../interface/IBarPoint')
import ChordPoint = require('./../interface/IChordPoint')
import Scale = require('./../util/Scale')
import D3Model = require('./../model/D3Model')

class StaffDrawer {
  private scale:Scale;
  private d3model:D3Model;

  constructor(scale:Scale, d3model:D3Model) {
    this.scale = scale;
    this.d3model = d3model;
  }

  public draw() {
    var $svg:D3.Selection = d3.select('#score');
    var xScale:D3.Scale.LinearScale = this.scale.getD3Scale();
    var staffData:BarPoint[] = this.d3model.barPoints;
    var chordData:ChordPoint[] = this.d3model.chordPoints;

    $svg.selectAll('use.bar')
      .data(staffData)
      .enter()
      .append('use')
      .attr({
              x: function(d) {
                return xScale(d.x);
              },
              y: function(d) {
                return xScale(d.y);
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
                return xScale(d.x);
              },
              y: function(d) {
                return xScale(d.y);
              },
              class: 'chord'
            })
      .text(function(d) {
              return d.chord;
            });

  }
}

export  = StaffDrawer

