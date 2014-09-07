/// <reference path="../../typings/tsd.d.ts" />

import List = require('./util.list')
import Chord = require('./model.chord')
import BarChords = require('./model.barChords')

class ScoreChords extends List<BarChords> {
  private chordId:string;

  constructor(barChordsArray:BarChords[]) {
    super(barChordsArray);
  }

  public static createNewScoreChords(musicalTime:number, numberOfBar:number):ScoreChords {
    var scoreChords = new ScoreChords(ScoreChords.makeEmptyList(musicalTime, numberOfBar));
    return scoreChords;
  }

  public static factory(chordId:string):ScoreChords {
    // todo ajax get
    var bars:string[][] = [
      ['Fm', '', 'Fm', '', 'Fm', '', 'Fm', ''],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm']
    ];

    var scoreChords = new ScoreChords(_.map<string[],BarChords>(bars, bar => {
      return BarChords.factory(bar);
    }));
    scoreChords.chordId = chordId;
    return scoreChords;
  }

  private static makeEmptyList(musicalTime:number, numberOfBar:number):BarChords[] {
    var list:BarChords[] = [];
    var barChords = BarChords.createEmptyBarChords(musicalTime);
    while(list.length < numberOfBar) {
      list.push(_.extend({}, barChords));
    }
    return list;
  }

  public save():boolean {
    //todo ajax post
    return true;
  }

}

export = ScoreChords
