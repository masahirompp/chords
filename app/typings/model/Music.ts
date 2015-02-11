import Util = require('../util/Util');
import Interval = require('../data/Interval');
import Temperament = require('../data/Temperament');
import Accidental = require('../data/Accidental');
import HarmonicType = require('../data/HarmonicType');
import Harmony = require('../data/Harmony');
import Tension = require('../data/Tension');

interface IChord {
  root: {
    input: string;
    sign: string;
    position: number;
  };
  harmony: {
    input: string;
    sign: string;
    relatives: number[];
    type: HarmonicType;
  };
  tension: {
    input: string;
    sign: string;
    relatives: number[];
    covered: number[];
  };
  bass: {
    input: string;
    sign: string;
    position: number;
  };
}

/**
 * 音程の正規化
 * @param position
 * @returns {number}
 */
export function normalizePosition(position: number) {
  return position < 0 ? normalizePosition(position + Interval.OCTAVE) : position % Interval.OCTAVE;
}

/**
 * 音高を取得
 * @type {Function}
 */
export var pitch = _.memoize(function() {
  return Util.combination(function(t, a) {
    return {
      position: normalizePosition(t.position + a.relative),
      input: t.input + a.input,
      sign: t.sign + a.sign
    };
  }, Temperament, Accidental)
});

/**
 * listの各要素の対象フィールド(field)の値が、expectである要素を探す関数を返す
 * @param list
 * @param field
 * @return {function(string): T}
 */
function pluckAndFind(list: any[], field: string) {
  return function(expect: string) {
    return _.find(list, < any > _.compose(Util.equality(expect), Util.plucker(field)));
  }
}

/**
 * listの要素のinput/signを検索して、引数と一致する要素を返す関数を返す
 * @param list
 * @return {function(string):*}
 * @example
 *  var findPitch = findByInputSign(pitch())
 *  findPitch('c#')
 *  // => {input:cs, sign:c#, ...}
 */
function findByInputSign(list: any[]) {
  return Util.dispatch(pluckAndFind(list, 'input'), pluckAndFind(list, 'sign'));
}

var findPitch = _.memoize(findByInputSign(pitch()));
var findHarmony = _.memoize(findByInputSign(Harmony));
var findTension = _.memoize(findByInputSign(Tension));

var regInput = /^([a-g][sf]?)([adgijmsu245679\-]*)(\(([sf139,]+)\))?(on([a-g][sf]?))?$/;
var regSign = /^([A-G][#♭]?)([adgijmMsu245679\-]*)(\(([#♭139,]+)\))?(on([A-G][#♭]?))?$/;

var execRegChord = Util.dispatch(Util.invoker('exec', regInput.exec), Util.invoker('exec', regSign.exec));

/**
 *
 * @type Function
 * @param inputOrSign {string}
 * @return {IChord}
 */
export var findChord = _.memoize(function(inputOrSign: string): IChord {
  var tmp = execRegChord(inputOrSign);
  return Util.doWhen(tmp, function() {
    return {
      root: findPitch(tmp[1]),
      harmony: findHarmony(tmp[2]),
      tension: Util.doWhen(tmp[4], Util.lazyInvoke(findTension, tmp[4])),
      bass: Util.doWhen(tmp[6], Util.lazyInvoke(findPitch, tmp[6]))
    };
  })
});

/**
 *
 * @param chord
 * @return {string}
 */
export function chordToInput(chord: IChord) {
  return Util.rePlucker('input')(chord)
    .join('');
}

/**
 *
 * @param chord
 * @return {string}
 */
export function chordToSign(chord: IChord) {
  return Util.rePlucker('sign')(chord)
    .join('');
}

/**
 *
 * @type {Function}
 */
export var inputToSign = Util.polymorphic(_.compose(chordToSign, findChord));

/**
 *
 * @type {Function}
 */
export var signToInput = Util.polymorphic(_.compose(chordToSign, findChord));
