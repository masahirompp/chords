/// <reference path="../../../tsd/immutable/immutable.d.ts" />

import Immutable = require('immutable');
import Util = require('../util/Util');

/**
 * オクターブ
 * @type {number}
 */
var OCTAVE = 12;

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

var normalizePosition = (position: number) => {
  while (position < 0) position = position + OCTAVE;
  return position % OCTAVE;
};

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

/**
 * 第三音
 */
interface Triad extends BaseValue {}
var TRIAD = Immutable.List < Triad > ([{
  value: 'Major',
  inputs: [''],
  sign: ''
}, {
  value: 'Minor',
  inputs: ['m'],
  sign: 'm'
}, {
  value: 'Augmented',
  inputs: ['a', 'aug'],
  sign: 'aug'
}, {
  value: 'Diminished',
  inputs: ['d', 'dim'],
  sign: 'dim'
}, {
  value: 'Sus2',
  inputs: ['sus2', 's2'],
  sign: 'sus2'
}, {
  value: 'Sus4',
  inputs: ['sus4', 's4'],
  sign: 'sus4'
}]);

/**
 * 四和音
 */
interface Tetrad extends BaseValue {}
var TETRAD = Immutable.List < Tetrad > ([{
  value: '6',
  inputs: ['6'],
  sign: '6'
}, {
  value: '7',
  inputs: ['7'],
  sign: '7'
}, {
  value: 'M7',
  inputs: ['M7'],
  sign: 'M7'
}, {
  value: 'NoTetrad',
  inputs: [''],
  sign: ''
}]);

/**
 * 五和音
 */
interface Pentad extends BaseValue {}
var PENTAD = Immutable.List < Pentad > ([{
  value: '9',
  inputs: ['9'],
  sign: '9'
}, {
  value: '11',
  inputs: ['11'],
  sign: '11'
}, {
  value: '13',
  inputs: ['13'],
  sign: '13'
}, {
  value: 'NoPentad',
  inputs: [''],
  sign: ''
}]);

/**
 * 追加音
 */
interface Added extends BaseValue {}
var ADDED = Immutable.List < Added > ([{
  value: 'Add9',
  inputs: ['add9'],
  sign: 'add9'
}, {
  value: 'Add11',
  inputs: ['add11'],
  sign: 'add11'
}, {
  value: 'NoAdded',
  inputs: [''],
  sign: ''
}]);

/**
 * 第五音
 */
interface Fifth extends BaseValue {}
var FIFTH = Immutable.List < Fifth > ([{
  value: 'Flatted5',
  inputs: ['-5'],
  sign: '-5'
}, {
  value: 'Augmented5',
  inputs: ['+5'],
  sign: '+5'
}, {
  value: 'NoFifth',
  inputs: [''],
  sign: ''
}]);

/**
 * テンション
 */
interface Tension extends BaseValue {}
var TENSION_BASE = Immutable.List < Tension > ([{
  value: 'T9',
  inputs: ['t9', 'T9'],
  sign: '9'
}, {
  value: 'T11',
  inputs: ['t11', 'T11'],
  sign: '11'
}, {
  value: 'T13',
  inputs: ['t13', 'T13'],
  sign: '13'
}]);

var TENSION = Immutable.List < Tension > (Util.combination(TENSION_BASE, ACCIDENTAL, (t, a) => {
  return {
    value: t.value + a.inputs[0],
    inputs: Util.combination(t.inputs, a.inputs, (i1, i2) => i1 + i2),
    sign: a.sign + t.sign
  };
}));

/**
 * 和音
 */
export interface HarmonicSet {
  third: Triad;
  tetrad: Tetrad;
  pentad: Pentad;
  added: Added;
  fifth: Fifth;
  tension: Tension;
  on: Pitch;
}

/**
 * コード
 */
export interface Chord {
  root: Pitch;
  harmonicSet: HarmonicSet;
}

/**
 * 調号
 */
export interface Signature {
  key: Chord;
  signature: Pitch[];
}
