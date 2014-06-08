define([], function() {
  'use strict';

  function D3Model(chords, point) {
    var staffData = [];
    var chordData = [];
    for (var i = 0; i < chords.count(); i++) {
      point.next();

      // staff
      var staffPoint = point.getStaffPoint();
      staffData.push({
        link: point.isFirstBar() ? '#firstBar' : '#bar',
        x: staffPoint.x,
        y: staffPoint.y
      });

      // chord
      var chordPoint = point.getChordPoint();
      for (var j = 0; j < chordPoint.xs.length; j++) {
        var chord = chords.read()[i][j];
        if (chord !== '') {
          chordData.push({
            x: chordPoint.xs[j],
            y: chordPoint.y,
            text: chord
          });
        }
      }
    }

    this._staffData = staffData;
    this._chordData = chordData;
  }

  D3Model.prototype.getStaffData = function() {
    return this._staffData;
  };

  D3Model.prototype.getChordData = function() {
    return this._chordData;
  };

  return D3Model;
});
