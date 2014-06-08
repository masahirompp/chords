define([], function() {
  'use strict';
  var d3 = window.d3;

  function StaffDrawer(scale, d3model) {
    this._scale = scale;
    this._d3model = d3model;
  }

  StaffDrawer.prototype.draw = function() {

    var $svg = d3.select('#score');
    var xScale = this._scale.getD3Scale();
    var staffData = this._d3model.getStaffData();
    var chordData = this._d3model.getChordData();

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
        return d.text;
      });
  };

  return StaffDrawer;

});
