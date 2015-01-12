/// <reference path="../../../tsd/immutable/immutable.d.ts" />

import Util = require('../util/Util');

/**
 * オクターブ
 * @type {number}
 */
var OCTAVE = 12;

/**
 * 和音を合成する
 * @param harmony1
 * @param harmony2
 * @returns {Harmonic[]}
 */
var superimpose = (harmony1: Harmonic[], harmony2: Harmonic[], signFunc = ((s1, s2) => s1 + s2)) => {

  var superimposed = Util.combination(harmony1, harmony2, (h1, h2) => {
    var covered = h1.relatives.concat(h1.covered);
    // 構成音と使用不可音に、追加する音が含まれていなければ、追加する。
    if (h2.relatives.every(h => covered.indexOf(h) === -1)) {
      return {
        value: h1.value + h2.value,
        inputs: Util.combination(h1.inputs, h2.inputs, (i1, i2) => i1 + i2),
        sign: signFunc(h1.sign, h2.sign),
        relatives: h1.relatives.concat(h2.relatives),
        covered: h1.covered.concat(h2.covered)
      };
    }
    return null;
  });

  return harmony1.concat(superimposed);
};

var normalizePosition = (position: number) => {
  while (position < 0) position = position + OCTAVE;
  return position % OCTAVE;
};



/**
 * 入力と出力のペア
 */
interface BaseValue {
  value: string; // DB保存値。
  inputs: string[]; // ユーザ入力値
  sign: string; // 見た目の記号。
}

/**
 * 音階
 */
interface Temperament extends BaseValue {
  position: number;
}
var TEMPERAMENT = Immutable.List < Temperament > ([{
  value: 'C',
  inputs: ['c', 'C'],
  sign: 'C',
  position: 0
}, {
  value: 'D',
  inputs: ['d', 'C'],
  sign: 'D',
  position: 2
}, {
  value: 'E',
  inputs: ['e', 'E'],
  sign: 'E',
  position: 4
}, {
  value: 'F',
  inputs: ['f', 'F'],
  sign: 'F',
  position: 5
}, {
  value: 'G',
  inputs: ['g', 'G'],
  sign: 'G',
  position: 7
}, {
  value: 'A',
  inputs: ['a', 'A'],
  sign: 'A',
  position: 9
}, {
  value: 'B',
  inputs: ['b', 'B'],
  sign: 'B',
  position: 11
}]);

/**
 * 変化記号
 */
export interface Accidental extends BaseValue {
  relative: number;
}
export var ACCIDENTAL = Immutable.List < Accidental > ([{
  value: 'Natural',
  inputs: [''],
  sign: '',
  relative: 0
}, {
  value: 'Sharped',
  inputs: ['s', 'S'],
  sign: '#',
  relative: 1
}, {
  value: 'Flatted',
  inputs: ['f', 'F'],
  sign: '♭',
  relative: -1
}]);

/**
 * 音高
 */
export interface Pitch extends BaseValue {
  base: Temperament;
  baseAccidental: Accidental;
  position: number;
}
export var PITCH = Immutable.List < Pitch > (Util.combination(TEMPERAMENT, ACCIDENTAL, (t, a) => {
  return {
    base: t,
    baseAccidental: a,
    position: normalizePosition(t.position + a.relative),
    value: t.value + a.inputs[0],
    inputs: Util.combination(t.inputs, a.inputs, (i1, i2) => i1 + i2),
    sign: t.sign + a.sign
  }
}));

var f9 = 10;
var n9 = 11;
var s9 = 12;
var n11 = 13;
var s11 = 14;
var f13 = 15;
var n13 = 16;

interface Harmonic extends BaseValue {
  relatives: number[]; // 構成音の相対位置
  covered: number[]; // 使用不可音の相対位置
}

/**
 * 第三音
 */
interface Triad extends Harmonic {}
var TRIAD = Immutable.List < Triad > ([{
  value: 'Major',
  inputs: [''],
  sign: '',
  relatives: [1, 3, 5],
  covered: [n11]
}, {
  value: 'Minor',
  inputs: ['m'],
  sign: 'm',
  relatives: [1, 3, 5],
  covered: [s9, s11]
}, {
  value: 'Minor7Flatted5',
  inputs: ['m7-5'],
  sign: 'm7-5',
  relatives: [1, 3, 5],
  covered: [2, 4, 6, 7, 9, s9, n11, s11]
}, {
  value: 'Major7Flatted5',
  inputs: ['7-5'],
  sign: '7-5',
  relatives: [1, 3, 5, 7],
  covered: [2, 4, 6, 9, s9, n11, s11]
}, {
  value: 'Augmented',
  inputs: ['a', 'aug'],
  sign: 'aug',
  relatives: [1, 3, 5],
  covered: [2, 6, 7, 9, f13]
}, {
  value: 'Augmented7',
  inputs: ['a7', 'aug7'],
  sign: 'aug7',
  relatives: [1, 3, 5, 7],
  covered: [2, 6, 9, f13]
}, {
  value: 'Diminished',
  inputs: ['d', 'dim'],
  sign: 'dim',
  relatives: [1, 3, 5],
  covered: [2, 6, 7, 9, n11, s11]
}, {
  value: 'Diminished7',
  inputs: ['d7', 'dim7'],
  sign: 'dim7',
  relatives: [1, 3, 5, 7],
  covered: [2, 6, 9, n11, s11]
}, {
  value: 'Sus2',
  inputs: ['sus2', 's2'],
  sign: 'sus2',
  relatives: [1, 2, 5],
  covered: [3, 4, 6, 7, 9, f9, n9, s9, n11, f13]
}, {
  value: 'Sus27',
  inputs: ['sus27', 's27'],
  sign: 'sus27',
  relatives: [1, 2, 5, 7],
  covered: [3, 4, 6, 9, f9, n9, s9, n11, f13]
}, {
  value: 'Sus4',
  inputs: ['sus4', 's4'],
  sign: 'sus4',
  relatives: [1, 4, 5],
  covered: [3, 6, 7, 9, f9, n9, s9, n11, s11, f13, n13]
}, {
  value: 'Sus47',
  inputs: ['sus47', 's47'],
  sign: 'sus47',
  relatives: [1, 4, 5, 7],
  covered: [3, 6, 9, f9, n9, s9, n11, s11, f13, n13]
}]);

/**
 * 四和音
 */
interface Tetrad extends Harmonic {}
var TETRAD = Immutable.List < Tetrad > ([{
  value: '6',
  inputs: ['6'],
  sign: '6',
  relatives: [6],
  covered: [2, 7, 9, f9, s9, n11, f13, n13]
}, {
  value: '69',
  inputs: ['69'],
  sign: '69',
  relatives: [6, 9],
  covered: [2, 7, f9, n9, s9, n11, f13, n13]
}, {
  value: '7',
  inputs: ['7'],
  sign: '7',
  relatives: [7],
  covered: [6, 9, n11]
}, {
  value: 'M7',
  inputs: ['M7'],
  sign: 'M7',
  relatives: [7],
  covered: [6, 9, f9, s9, n11, f13]
}, {
  value: '9',
  inputs: ['9'],
  sign: '9',
  relatives: [7, 9],
  covered: [2, 6, f9, n9, s9, n11, f13, n13]
}, {
  value: 'M9',
  inputs: ['M9'],
  sign: 'M9',
  relatives: [7, 9],
  covered: [2, 6, f9, n9, s9, n11, f13, n13]
}, {
  value: 'Add9',
  inputs: ['add9', 'a9'],
  sign: 'add9',
  relatives: [2],
  covered: [6, 7, 9, f9, n9, s9, n11, s11, f13, n13]
}]);

/**
 * テンション
 */
interface Tension extends Harmonic {}
var TENSION_BASE: Tension[] = [{
  value: 'T9',
  inputs: ['t9', 'T9'],
  sign: '9',
  relatives: [n9],
  covered: [f9, s9]
}, {
  value: 'T9Flatted',
  inputs: ['t9f', 't9F', 'T9f', 'T9F'],
  sign: '♭9',
  relatives: [f9],
  covered: [n9]
}, {
  value: 'T9Sharped',
  inputs: ['t9s', 't9S', 'T9s', 'T9S'],
  sign: '#9',
  relatives: [s9],
  covered: [n9, f9]
}, {
  value: 'T11',
  inputs: ['t11', 'T11'],
  sign: '11',
  relatives: [n11],
  covered: [f9, n9, s9, s11]
}, {
  value: 'T11Sharped',
  inputs: ['t11s', 't11S', 'T11s', 'T11S'],
  sign: '#11',
  relatives: [s11],
  covered: [f9, n9, s9, n11]
}, {
  value: 'T13',
  inputs: ['t13', 'T13'],
  sign: '13',
  relatives: [f13],
  covered: [f9, n9, s9, n11, s11, n13]
}, {
  value: 'T13Flatted',
  inputs: ['t13f', 't13F', 'T13f', 'T13F'],
  sign: '♭13',
  relatives: [n13],
  covered: [f9, n9, s9, n11, s11, f13]
}];

var TENSION = [TENSION_BASE, TENSION_BASE, TENSION_BASE]
  .reduce((t1, t2) => superimpose(t1, t2, (s1, s2) => s1 + ',' + s2))
  .map(t => {
    if (t.sign) t.sign = '(' + t.sign + ')';
    return t;
  });

/**
 * 和音
 */
export interface HarmonicSet extends Harmonic {}
export var HARMONICSET: HarmonicSet[] = ((harmonies: Harmonic[][]) => {
    return harmonies.reduce((h1, h2) => superimpose(h1, h2))
  })([TRIAD.toArray(), TETRAD.toArray(), TENSION])
  .map(h => {
    h['covered'] = [];
    return h;
  });

console.log(HARMONICSET.map(h => h.sign));

/**
 * コード
 */
export interface Chord {
  root: Pitch;
  harmonicSet: HarmonicSet;
  on: Pitch;
}

/**
 * 調号
 */
export interface Signature {
  key: Chord;
  signature: Pitch[];
}