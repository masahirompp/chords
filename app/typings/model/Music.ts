/// <reference path="../../../tsd/immutable/Immutable.d.ts" />
/// <reference path="../../../tsd/monapt/monapt.d.ts" />

import Util = require('../util/Util');

/**
 * インターバル
 * @type {number}
 */
var P1 = 0,
  M2 = 2,
  m3 = 3,
  M3 = 4,
  P4 = 5,
  D5 = 6,
  P5 = 7,
  A5 = 8,
  m6 = 8,
  M6 = 9,
  m7 = 10,
  M7 = 11,
  OCTAVE = 12,
  M9 = 14,
  f9 = 13,
  n9 = 14,
  s9 = 15,
  n11 = 17,
  s11 = 18,
  f13 = 20,
  n13 = 21;

/**
 * 音程の正規化
 * @param position
 * @returns {number}
 */
var normalizePosition = (position: number): number => {
  while (position < 0) position = position + OCTAVE;
  return position % OCTAVE;
};

/**
 * 入力と出力のペア
 */
interface IBaseValue {
  input: string; // ユーザ入力値
  sign: string; // 表示値
}

/**
 * 音程
 */
export module Pitch {

  /**
   * 音階
   */
  interface ITemperament extends IBaseValue {
    position: number;
  }
  var TEMPERAMENT: ITemperament[] = [{
    input: 'c',
    sign: 'C',
    position: P1
  }, {
    input: 'd',
    sign: 'D',
    position: M2
  }, {
    input: 'e',
    sign: 'E',
    position: M3
  }, {
    input: 'f',
    sign: 'F',
    position: P4
  }, {
    input: 'g',
    sign: 'G',
    position: P5
  }, {
    input: 'a',
    sign: 'A',
    position: M6
  }, {
    input: 'b',
    sign: 'B',
    position: M7
  }];

  /**
   * 変化記号
   */
  interface IAccidental extends IBaseValue {
    relative: number;
  }
  var ACCIDENTAL: IAccidental[] = [{
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
  export interface IPitch extends IBaseValue {
    position: number;
  }
  var PITCH = Immutable.Seq(Util.combination(TEMPERAMENT, ACCIDENTAL, (t, a) => {
    return {
      position: normalizePosition(t.position + a.relative),
      input: t.input + a.input,
      sign: t.sign + a.sign
    }
  }));

  export function findByInput(input: string): IPitch {
    return PITCH.find(p => p.input === input);
  }

  export function findBySign(sign: string): IPitch {
    return PITCH.find(p => p.sign === sign);
  }
}

/**
 * 和音
 */
module Harmony {

  enum HarmonicType {
    MAJOR,
    MAJOR6,
    DOMINANT7,
    MINOR,
    HALF_DIMINISH,
    ALTERD,
    AUGUMENT,
    DIMINISH
  }

  export interface IHarmony extends IBaseValue {
    type: HarmonicType;
    relatives: number[]; // 構成音の相対位置
  }

  var HARMONY: Immutable.IndexedSeq < IHarmony > = Immutable.Seq([{
    input: '',
    sign: '',
    relatives: [P1, M3, P5],
    type: HarmonicType.MAJOR
  }, {
    input: 'maj7',
    sign: 'M7',
    relatives: [P1, M3, P5, M7],
    type: HarmonicType.MAJOR
  }, {
    input: 'maj9',
    sign: 'M9',
    relatives: [P1, M3, P5, M7, M9],
    type: HarmonicType.MAJOR
  }, {
    input: '6',
    sign: '6',
    relatives: [P1, M3, P5, M6],
    type: HarmonicType.MAJOR6
  }, {
    input: '69',
    sign: '69',
    relatives: [P1, M3, P5, M6, M9],
    type: HarmonicType.MAJOR6
  }, {
    input: 'add9',
    sign: 'add9',
    relatives: [P1, M3, P5, M9],
    type: HarmonicType.MAJOR
  }, {
    input: 'sus2',
    sign: 'sus2',
    relatives: [P1, P5, M2],
    type: HarmonicType.MAJOR
  }, {
    input: 'sus4',
    sign: 'sus4',
    relatives: [P1, P4, P5],
    type: HarmonicType.MAJOR
  }, {
    input: 'sus47',
    sign: 'sus47',
    relatives: [P1, P4, P5, m7],
    type: HarmonicType.MAJOR
  }, {
    input: '7',
    sign: '7',
    relatives: [P1, M3, P5, m7],
    type: HarmonicType.DOMINANT7
  }, {
    input: '9',
    sign: '9',
    relatives: [P1, M3, P5, m7, M9],
    type: HarmonicType.DOMINANT7
  }, {
    input: 'm',
    sign: 'm',
    relatives: [P1, m3, P5],
    type: HarmonicType.MINOR
  }, {
    input: 'm7',
    sign: 'm7',
    relatives: [P1, m3, P5, m7],
    type: HarmonicType.MINOR
  }, {
    input: 'm9',
    sign: 'm9',
    relatives: [P1, m3, P5, m7, M9],
    type: HarmonicType.MINOR
  }, {
    input: 'mM7',
    sign: 'mmaj7',
    relatives: [P1, m3, P5, M7],
    type: HarmonicType.MINOR
  }, {
    input: 'mM9',
    sign: 'mmaj9',
    relatives: [P1, m3, P5, M7, M9],
    type: HarmonicType.MINOR
  }, {
    input: 'm6',
    sign: 'm6',
    relatives: [P1, m3, P5, M6],
    type: HarmonicType.MINOR
  }, {
    input: 'm69',
    sign: 'm69',
    relatives: [P1, m3, P5, M6, M9],
    type: HarmonicType.MINOR
  }, {
    input: 'madd9',
    sign: 'madd9',
    relatives: [P1, m3, P5, M9],
    type: HarmonicType.MINOR
  }, {
    input: 'm7-5',
    sign: 'm7-5',
    relatives: [P1, m3, D5, m7],
    type: HarmonicType.HALF_DIMINISH
  }, {
    input: 'm9-5',
    sign: 'm9-5',
    relatives: [P1, m3, D5, m7, M2],
    type: HarmonicType.HALF_DIMINISH
  }, {
    input: '-5',
    sign: '-5',
    relatives: [P1, M3, D5],
    type: HarmonicType.ALTERD
  }, {
    input: '-57',
    sign: '-57',
    relatives: [P1, M3, D5, m7],
    type: HarmonicType.ALTERD
  }, {
    input: '-59',
    sign: '-59',
    relatives: [P1, M3, D5, m7, M9],
    type: HarmonicType.ALTERD
  }, {
    input: 'aug',
    sign: 'aug',
    relatives: [P1, M3, A5],
    type: HarmonicType.AUGUMENT
  }, {
    input: 'aug7',
    sign: 'aug7',
    relatives: [P1, M3, A5, m7],
    type: HarmonicType.AUGUMENT
  }, {
    input: 'aug9',
    sign: 'aug9',
    relatives: [P1, M3, A5, m7, M9],
    type: HarmonicType.AUGUMENT
  }, {
    input: 'dim',
    sign: 'dim',
    relatives: [P1, m3, D5],
    type: HarmonicType.DIMINISH
  }, {
    input: 'dim7',
    sign: 'dim7',
    relatives: [P1, m3, D5, M6],
    type: HarmonicType.DIMINISH
  }, {
    input: 'dim9',
    sign: 'dim9',
    relatives: [P1, m3, D5, M6, M9],
    type: HarmonicType.DIMINISH
  }]);

  export function findByInput(input: string): IHarmony {
    return HARMONY.find(h => h.input === input);
  }

  export function findBySign(sign: string): IHarmony {
    return HARMONY.find(h => h.sign === sign);
  }
}

/**
 * テンション
 */
module Tension {

  interface ITension extends IBaseValue {
    relatives: number[];
    covered: number[];
  }
  export interface ITensions {
    tensions: ITension[];
  }

  var TENSION: Immutable.IndexedSeq < ITension > = Immutable.Seq([{
    input: 'f9',
    sign: '♭9',
    relatives: [f9],
    covered: [n9]
  }, {
    input: '9',
    sign: '9',
    relatives: [n9],
    covered: [f9, s9]
  }, {
    input: 's9',
    sign: '#9',
    relatives: [s9],
    covered: [n9, f9]
  }, {
    input: '11',
    sign: '11',
    relatives: [n11],
    covered: [f9, n9, s9, s11]
  }, {
    input: 's11',
    sign: '#11',
    relatives: [s11],
    covered: [f9, n9, s9, n11]
  }, {
    input: 'f13',
    sign: '♭13',
    relatives: [n13],
    covered: [f9, n9, s9, n11, s11, f13]
  }, {
    input: '13',
    sign: '13',
    relatives: [f13],
    covered: [f9, n9, s9, n11, s11, n13]
  }]);

  export function findByInput(input: string): ITensions {
    return {
      tensions: input ? input.split(',')
        .map(i => TENSION.find(t => t.input === i)) : []
    }
  }

  export function findBySign(sign: string): ITensions {
    return {
      tensions: sign ? sign.split(',')
        .map(s => TENSION.find(t => t.sign === s)) : []
    }
  }

  export function toInput(tension: ITensions): string {
    return tension.tensions.length ? '(' + tension.tensions.map(t => t.input)
      .join(',') + ')' : '';
  }

  export function toSign(tension: ITensions): string {
    return tension.tensions.length ? '(' + tension.tensions.map(t => t.sign)
      .join(',') + ')' : '';
  }

  export function inputToSign(input: string): string {
    return toSign(findByInput(input));
  }

  export function singToInput(sign: string): string {
    return toInput(findBySign(sign));
  }
}

/**
 * コード
 */
export module Chord {

  export interface IChord {
    root: Pitch.IPitch;
    harmony: Harmony.IHarmony;
    tension: monapt.Option < Tension.ITensions > ;
    bass: monapt.Option < Pitch.IPitch > ;
  }

  var toSign = (chord: IChord): string => {
    return chord.root.sign + chord.harmony.sign + chord.tension.match({
      Some: Tension.toSign,
      None: () => ''
    }) + chord.bass.match({
      Some: b => 'on' + b.sign,
      None: () => ''
    })
  };

  var toInput = (chord: IChord): string => {
    return <string > chord.root.input + chord.harmony.input + chord.tension.match({
      Some: Tension.toInput,
      None: () => ''
    }) + chord.bass.match({
      Some: b => 'on' + b.input,
      None: () => ''
    })
  };

  var regInput = /^([a-g][sf]?)([adgijmsu245679\-]*)(\(([sf139,]+)\))?(on([a-g][sf]?))?$/;
  var regSign = /^([A-G][#♭]?)([adgijmMsu245679\-]*)(\(([#♭139,]+)\))?(on([A-G][#♭]?))?$/;

  export function findByInput(input: string): IChord {
    var tmp = regInput.exec(input);
    return {
      root: Pitch.findByInput(tmp[1]),
      harmony: Harmony.findByInput(tmp[2]),
      tension: new monapt.Some(Tension.findByInput(tmp[4])),
      bass: new monapt.Some(Pitch.findByInput(tmp[6]))
    };
  }

  export function findBySign(sign: string): IChord {
    var tmp = regSign.exec(sign);
    return {
      root: Pitch.findBySign(tmp[1]),
      harmony: Harmony.findBySign(tmp[2]),
      tension: new monapt.Some(Tension.findBySign(tmp[4])),
      bass: new monapt.Some(Pitch.findBySign(tmp[6]))
    };
  }

  export function inputToSign(input: string): string {
    return toSign(findByInput(input));
  }

  export function signToInput(sign: string): string {
    return toInput(findBySign(sign));
  }
}

/**
 * 調号
 */
export module Signature {

  var SIGNATURE: Immutable.Seq < string, string[] > = Immutable.Seq({
    c: [],
    cs: ['fs', 'cs', 'gs', 'ds', 'as', 'es', 'bs'],
    df: ['bf', 'ef', 'af', 'df', 'gf'],
    d: ['fs', 'cs'],
    ef: ['bf', 'ef', 'af'],
    e: ['fs', 'cs', 'gs', 'ds'],
    f: ['bf'],
    fs: ['fs', 'cs', 'gs', 'ds', 'as', 'es'],
    gf: ['bf', 'ef', 'af', 'df', 'gf', 'cf'],
    g: ['fs'],
    af: ['bf', 'ef', 'af', 'df'],
    a: ['fs', 'cs', 'gs'],
    bf: ['bf', 'ef'],
    b: ['fs', 'cs', 'gs', 'ds', 'as'],
    cf: ['bf', 'ef', 'af', 'df', 'gf', 'cf', 'ff'],
    cm: ['bf, ef, af'],
    csm: ['fs, cs, gs, ds'],
    dm: ['bf'],
    dsm: ['fs, cs, gs, ds, as, es'],
    efm: ['bf, ef, af, df, gf, cf'],
    em: ['fs'],
    fm: ['bf, ef, af, df'],
    fsm: ['fs, cs, gs'],
    gm: ['bf, ef'],
    gsm: ['fs, cs, gs, ds, as'],
    afm: ['bf, ef, af, df, gf, cf, ff'],
    am: [],
    asm: ['fs, cs, gs, ds, as, es, bs'],
    bfm: ['bf, ef, af, df, gf'],
    bm: ['fs, cs']
  });

  export function KeySigns(): Immutable.Iterable < number, string > {
    return SIGNATURE.keySeq()
      .map(Chord.inputToSign);
  }

  export function getSignatureFromSign(sign: string): Pitch.IPitch[] {
    return SIGNATURE.get(Chord.signToInput(sign))
      .map(signature => Pitch.findByInput(signature))
  }

}