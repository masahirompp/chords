/// <reference path="../../typings/tsd.d.ts" />

import IPoint = require('./interface.point')
import BarPoint = require('./interface.barPoint')
import ChordPoint = require('./interface.chordPoint')
import StaffManager = require('./model.staffManager')
import Chord = require('./model.chord')
import BarChords = require('./model.barChords')
import ScoreChords = require('./model.scoreChords')

class D3Model {
  private _barPoints:BarPoint[] = [];
  private _chordPoints:ChordPoint[] = [];

  constructor(scoreChords:ScoreChords, staffManager:StaffManager) {
    for(var i:number = 0; i < scoreChords.size(); i++) {
      staffManager.next();

      // staff
      var staffPoint:IPoint = staffManager.getStaffPoint();
      this._barPoints.push({
                             link: staffManager.isFirstBar() ? '#firstBar' : '#bar',
                             x: staffPoint.x,
                             y: staffPoint.y
                           });

      // chord
      // TODO Refactor
      var barPoint:IPoint[] = staffManager.getChordPoint();
      var barChords:BarChords = scoreChords.get(i);
      for(var j:number = 0; j < barChords.size(); j++) {
        var chord:Chord = barChords.get(j);
        if(chord.text !== '') {
          this._chordPoints.push({
                                   x: barPoint[j].x,
                                   y: barPoint[j].y,
                                   chord: barChords.get(j).text
                                 });
        }
      }
    }
  }

  get barPoints():BarPoint[] {
    return this._barPoints;
  }

  get chordPoints():ChordPoint[] {
    return this._chordPoints;
  }
}

export = D3Model
