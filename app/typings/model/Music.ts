import Util = require('../util/Util');
import Interval = require('../data/Interval');
import Temperament = require('../data/Temperament');
import Accidental = require('../data/Accidental');
import Harmony = require('../data/Harmony');
import Tension = require('../data/Tension');

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
  return Util.continuousInvoke(pluckAndFind(list, 'input'), pluckAndFind(list, 'sign'));
}

var findPitch = _.memoize(findByInputSign(pitch()));
var findHarmony = _.memoize(findByInputSign(Harmony));
var findTension = _.memoize(findByInputSign(Tension));

var regInput = /^([a-g][sf]?)([adgijmsu245679\-]*)(\(([sf139,]+)\))?(on([a-g][sf]?))?$/;
var regSign = /^([A-G][#♭]?)([adgijmMsu245679\-]*)(\(([#♭139,]+)\))?(on([A-G][#♭]?))?$/;

var execRegChord = Util.continuousInvoke(regInput.exec, regSign.exec);

/**
 * コードを探す
 * @param inputOrSign
 */
export function findChord(inputOrSign: string) {
  var tmp = execRegChord(inputOrSign);
  Util.doWhen(tmp, function() {
    return {
      root: findPitch(tmp[1]),
      harmony: findHarmony(tmp[2]),
      tension: Util.doWhen(tmp[4], Util.lazyInvoke(findTension, tmp[4])),
      bass: Util.doWhen(tmp[6], Util.lazyInvoke(findPitch, tmp[6]))
    };
  })
}
