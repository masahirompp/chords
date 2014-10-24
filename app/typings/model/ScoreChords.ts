import List = require('./../util/List')
import Chord = require('./Chord')
import BarChords = require('./BarChords')

class ScoreChords extends List < BarChords > {

  constructor(barChordsArray: BarChords[]) {
    super(barChordsArray);
  }

  public static createNewScoreChords(musicalTime: number, numberOfBar: number): ScoreChords {
    var scoreChords = new ScoreChords(ScoreChords.makeEmptyList(musicalTime, numberOfBar));
    return scoreChords;
  }

  public static factory(bars: Array < Array < string >> ): ScoreChords {
    var scoreChords = new ScoreChords(bars.map(bar => {
      return BarChords.factory(bar);
    }));
    return scoreChords;
  }

  private static makeEmptyList(musicalTime: number, numberOfBar: number): BarChords[] {
    var list: BarChords[] = [];
    var barChords = BarChords.createEmptyBarChords(musicalTime);
    while (list.length < numberOfBar) {
      list.push($.extend({}, barChords));
    }
    return list;
  }

  public save(): boolean {
    //todo ajax post
    return true;
  }

}

export = ScoreChords