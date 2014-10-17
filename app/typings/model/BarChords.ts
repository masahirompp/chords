/// <reference path="../../../tsd/underscore/underscore.d.ts" />

import List = require('../util/List')
import Chord = require('./Chord')

class BarChords extends List<Chord> {

  constructor(chords:Chord[]) {
    super(chords);
  }

  public static createEmptyBarChords(musicalTime:number):BarChords {
    return BarChords.factory(BarChords.makeEmptyList(musicalTime));
  }

  public static factory(chordStrings:string[]) {
    var barChords = new BarChords(_.map<string ,Chord>(chordStrings, chordString => {
      return new Chord(chordString);
    }));
    return barChords;
  }

  private static makeEmptyList(size:number):string[] {
    var list:string[] = [];
    while(list.length < size) {
      list.push('');
    }
    return list;
  }

}

export = BarChords
