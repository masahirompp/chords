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
        x: (d:BarPoint) => {
          return viewScale.calc(d.x);
        },
        y: (d:BarPoint) => {
          return viewScale.calc(d.y);
        },
        'xlink:href': function(d) {
          return d.link;
        },
        'class': 'bar'
      });

    $svg.selectAll('text.chord')
      .data(chordData)
      .enter()
      .append('text')
      .attr({
        x: (d:ChordPoint) => {
          return viewScale.calc(d.x);
        },
        y: (d:ChordPoint) => {
          return viewScale.calc(d.y);
        },
        'class': 'chord',
        'font-size': ()=> {
          return viewScale.floor(d3model.fontSize) + 'px';
        }
      })
      .text((d:ChordPoint) => {
        return d.chord;
      });

  }
}

export  = StaffDrawer
