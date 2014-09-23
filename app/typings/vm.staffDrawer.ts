import BarPoint = require('./interface.barPoint')
import ChordPoint = require('./interface.chordPoint')
import Scale = require('./util.scale')
import D3Model = require('./model.d3model')

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

