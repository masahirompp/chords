/// <reference path="../../typings/tsd.d.client.ts" />

class Chord {
  private chordString:string;

  constructor(chordString:string){
    this.chordString = chordString;
  }

  // Fm7-5add9(-13)
  get text():string{
    return this.chordString;
  }

  // todo
  // F
  get root():string{
    return '';
  }

  // m
  get triad():string{
    return '';
  }

  // 7
  get interval():string{
    return ''
  }

  // -5
  get alt():string{
    return '';
  }

  // add9
  get add():string{
    return '';
  }

  // -13
  get tension():string{
    return '';
  }
}

export = Chord
