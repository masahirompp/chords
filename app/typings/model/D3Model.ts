import IPoint = require('./../interface/IPoint')
import BarPoint = require('./../interface/IBarPoint')
import ChordPoint = require('./../interface/IChordPoint')
import StaffManager = require('./StaffManager')
import Chord = require('./Chord')
import BarChords = require('./BarChords')
import ScoreChords = require('./ScoreChords')

class D3Model {
  private _barPoints:BarPoint[] = [];
  private _chordPoints:ChordPoint[] = [];

  constructor(public scoreChords:ScoreChords, public staffManager:StaffManager) {
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

  get fontSize():number {
    return this.staffManager.settings.fontSize;
  }
}

export = D3Model
