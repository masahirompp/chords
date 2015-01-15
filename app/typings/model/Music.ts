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
        input: h1.input + h2.input,
        sign: signFunc(h1.sign, h2.sign),
        relatives: h1.relatives.concat(h2.relatives),
        covered: h1.covered.concat(h2.covered)
      };
    }
    return null;
  });

  return harmony1.concat(superimposed);
};

/**
 * 音程の正規化
 * @param position
 * @returns {number}
 */
var normalizePosition = (position: number) => {
  while (position < 0) position = position + OCTAVE;
  return position % OCTAVE;
};


/**
 * 入力と出力のペア
 */
interface BaseValue {
  input: string; // ユーザ入力値
  sign: string; // 表示値
}

/**
 * 音階
 */
interface Temperament extends BaseValue {
  position: number;
}
var TEMPERAMENT: Temperament[] = [{
  input: 'c',
  sign: 'C',
  position: 0
}, {
  input: 'd',
  sign: 'D',
  position: 2
}, {
  input: 'e',
  sign: 'E',
  position: 4
}, {
  input: 'f',
  sign: 'F',
  position: 5
}, {
  input: 'g',
  sign: 'G',
  position: 7
}, {
  input: 'a',
  sign: 'A',
  position: 9
}, {
  input: 'b',
  sign: 'B',
  position: 11
}];

/**
 * 変化記号
 */
export interface Accidental extends BaseValue {
  relative: number;
}
export var ACCIDENTAL: Accidental[] = [{
  input: '',
  sign: '',
  relative: 0
}, {
  input: 's',
  sign: '#',
  relative: 1
}, {
  input: 'f',
  sign: '♭',
  relative: -1
}];

/**
 * 音高
 */
export interface Pitch extends BaseValue {
  base: Temperament;
  baseAccidental: Accidental;
  position: number;
}
export var PITCH: Pitch[] = Util.combination(TEMPERAMENT, ACCIDENTAL, (t, a) => {
  return {
    base: t,
    baseAccidental: a,
    position: normalizePosition(t.position + a.relative),
    input: t.input + a.input,
    sign: t.sign + a.sign
  }
});

var f9 = 13;
var n9 = 14;
var s9 = 15;
var n11 = 17;
var s11 = 18;
var f13 = 20;
var n13 = 21;

interface Harmonic extends BaseValue {
  relatives: number[]; // 構成音の相対位置
  covered: number[]; // 使用不可音の相対位置
}

/**
 * 第三音
 */
interface Triad extends Harmonic {}
var TRIAD: Triad[] = [{
  input: '',
  sign: '',
  relatives: [1, 3, 5],
  covered: [n11]
}, {
  input: 'm',
  sign: 'm',
  relatives: [1, 3, 5],
  covered: [s9, s11]
}, {
  input: 'm7-5',
  sign: 'm7-5',
  relatives: [1, 3, 5],
  covered: [2, 4, 6, 7, 9, s9, n11, s11]
}, {
  input: '7-5',
  sign: '7-5',
  relatives: [1, 3, 5, 7],
  covered: [2, 4, 6, 9, s9, n11, s11]
}, {
  input: 'aug',
  sign: 'aug',
  relatives: [1, 3, 5],
  covered: [2, 6, 7, 9, f13]
}, {
  input: 'aug7',
  sign: 'aug7',
  relatives: [1, 3, 5, 7],
  covered: [2, 6, 9, f13]
}, {
  input: 'dim',
  sign: 'dim',
  relatives: [1, 3, 5],
  covered: [2, 6, 7, 9, n11, s11]
}, {
  input: 'dim7',
  sign: 'dim7',
  relatives: [1, 3, 5, 7],
  covered: [2, 6, 9, n11, s11]
}, {
  input: 'sus2',
  sign: 'sus2',
  relatives: [1, 2, 5],
  covered: [3, 4, 6, 7, 9, f9, n9, s9, n11, f13]
}, {
  input: 'sus27',
  sign: 'sus27',
  relatives: [1, 2, 5, 7],
  covered: [3, 4, 6, 9, f9, n9, s9, n11, f13]
}, {
  input: 'sus4',
  sign: 'sus4',
  relatives: [1, 4, 5],
  covered: [3, 6, 7, 9, f9, n9, s9, n11, s11, f13, n13]
}, {
  input: 'sus47',
  sign: 'sus47',
  relatives: [1, 4, 5, 7],
  covered: [3, 6, 9, f9, n9, s9, n11, s11, f13, n13]
}];

/**
 * 四和音
 */
interface Tetrad extends Harmonic {}
var TETRAD: Tetrad[] = [{
  input: '6',
  sign: '6',
  relatives: [6],
  covered: [2, 7, 9, f9, s9, n11, f13, n13]
}, {
  input: '69',
  sign: '69',
  relatives: [6, 9],
  covered: [2, 7, f9, n9, s9, n11, f13, n13]
}, {
  input: '7',
  sign: '7',
  relatives: [7],
  covered: [6, 9, n11]
}, {
  input: 'maj7',
  sign: 'M7',
  relatives: [7],
  covered: [6, 9, f9, s9, n11, f13]
}, {
  input: '9',
  sign: '9',
  relatives: [7, 9],
  covered: [2, 6, f9, n9, s9, n11, f13, n13]
}, {
  input: 'maj9',
  sign: 'M9',
  relatives: [7, 9],
  covered: [2, 6, f9, n9, s9, n11, f13, n13]
}, {
  input: 'add9',
  sign: 'add9',
  relatives: [2],
  covered: [6, 7, 9, f9, n9, s9, n11, s11, f13, n13]
}];

/**
 * テンション
 */
interface Tension extends Harmonic {}
var TENSION_BASE: Tension[] = [{
  input: 't9',
  sign: '9',
  relatives: [n9],
  covered: [f9, s9]
}, {
  input: 'tf9',
  sign: '♭9',
  relatives: [f9],
  covered: [n9]
}, {
  input: 'ts9',
  sign: '#9',
  relatives: [s9],
  covered: [n9, f9]
}, {
  input: 't11',
  sign: '11',
  relatives: [n11],
  covered: [f9, n9, s9, s11]
}, {
  input: 'ts11',
  sign: '#11',
  relatives: [s11],
  covered: [f9, n9, s9, n11]
}, {
  input: 't13',
  sign: '13',
  relatives: [f13],
  covered: [f9, n9, s9, n11, s11, n13]
}, {
  input: 'tf13',
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
  })([TRIAD, TETRAD, TENSION])
  .map(h => {
    h['covered'] = [];
    return h;
  });

console.log(PITCH.map(p => p.sign));
console.log(PITCH.map(p => p.input));
console.log(HARMONICSET.map(h => h.sign));
console.log(HARMONICSET.map(h => h.input));

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
