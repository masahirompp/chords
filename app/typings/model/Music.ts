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
    type: string;
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
 * listの要素のinput/signを検索して、引数と一致する要素を返す関数を返す
 * @param list
 * @return {function(string):*}
 * @example
 *  var findPitch = findByInputSign(pitch())
 *  findPitch('c#')
 *  // => {input:cs, sign:c#, ...}
 */
function findByInputSign(list: any[]) {
  return Util.dispatch(Util.pluckAndFind(list, 'input'), Util.pluckAndFind(list, 'sign'));
}

export var findPitch = _.memoize(findByInputSign(pitch()));
var findHarmony = _.memoize(findByInputSign(Harmony));
var findTension = _.memoize(findByInputSign(Tension));

var regInput = /^([a-g](s(?!u)|f)?)([adgijmsu245679\-]*)(\(([sf139,]+)\))?(on([a-g][sf]?))?$/;
var regSign = /^([A-G](#|b|(♭))?)([adgijmMsu245679\-]*)(\(([#b♭139,]+)\))?(on([A-G][#b♭]?))?$/;
var execRegChord = Util.dispatch(regInput.exec.bind(regInput), regSign.exec.bind(regSign));

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
      harmony: findHarmony(tmp[3]),
      tension: Util.doWhen(tmp[5], Util.lazyInvoke(findTension, tmp[5])),
      bass: Util.doWhen(tmp[7], Util.lazyInvoke(findPitch, tmp[7]))
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
