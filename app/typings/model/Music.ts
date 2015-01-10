/// <reference path="../../../tsd/immutable/immutable.d.ts" />

/**
 * 音階
 */
export interface Temperament {
  value: string; //C ,D ,E, F, G, A, B
  position: number;
}
export var TEMPERAMENT: Immutable.Map < string, Temperament > = Immutable.fromJS({
  C: {
    value: 'C',
    position: 0
  },
  D: {
    value: 'D',
    position: 2
  },
  E: {
    value: 'E',
    position: 4
  },
  F: {
    value: 'F',
    position: 5
  },
  G: {
    value: 'G',
    position: 7
  },
  A: {
    value: 'A',
    position: 9
  },
  B: {
    value: 'B',
    position: 11
  }
});

/**
 * 変化記号
 */
export interface Accidental {
  value: string; //sharped, flatted, natural
  sign: string; //#, ♭
  relative: number;
}
export var ACCIDENTAL: Immutable.Map < string, Accidental > = Immutable.fromJS({
  sharped: {
    value: 'sharped',
    sign: '#',
    relative: 1
  },
  flatted: {
    value: 'flatted',
    sign: '♭',
    relative: -1
  },
  natural: {
    value: 'natural',
    sign: '',
    relative: 0
  }
});

/**
 * 音高
 */
interface Pitch {
  base: Temperament;
  baseAccidental: Accidental;
  position: number;
}
interface Pitches {
  (value: string): Pitch;
}

/**
 * 和音
 */
interface HarmonicSet {
  third: Third;
  tetrad: Tetrad;
  pentad: Pentad;
  added: Added;
  fifth: Fifth;
  tension: Tension;
  on: Pitch;
}
interface Third {
  value: string; //Major, Minor, Augmented, Diminished, Sus4, Sus2
}
interface Tetrad {
  value: string; // 6, 7, M7
}
interface Pentad {
  value: string; // 9, 11, 13
}
interface Added {
  value: string; // add9, add11
}
interface Fifth {
  value: string; // -5, +5
}
interface Tension {
  value: string; // #11, #9, etc...
}

/**
 * コード
 */
interface Chord {
  root: Pitch;
  harmonicSet: HarmonicSet;
}

/**
 * 調号
 */
interface Signature {
  key: Chord;
  signature: Pitch[];
}