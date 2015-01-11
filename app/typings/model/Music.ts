/// <reference path="../../../tsd/immutable/immutable.d.ts" />

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
var TEMPERAMENT: Immutable.Map < string, Temperament > = Immutable.fromJS({
  C: {
    value: 'C',
    inputs: ['c', 'C'],
    sign: 'C',
    position: 0
  },
  D: {
    value: 'D',
    inputs: ['d', 'C'],
    sign: 'D',
    position: 2
  },
  E: {
    value: 'E',
    inputs: ['e', 'E'],
    sign: 'E',
    position: 4
  },
  F: {
    value: 'F',
    inputs: ['f', 'F'],
    sign: 'F',
    position: 5
  },
  G: {
    value: 'G',
    inputs: ['g', 'G'],
    sign: 'G',
    position: 7
  },
  A: {
    value: 'A',
    inputs: ['a', 'A'],
    sign: 'A',
    position: 9
  },
  B: {
    value: 'B',
    inputs: ['b', 'B'],
    sign: 'B',
    position: 11
  }
});

/**
 * 変化記号
 */
export interface Accidental extends BaseValue {
  relative: number;
}
export var ACCIDENTAL: Immutable.Map < string, Accidental > = Immutable.fromJS({
  Natural: {
    value: 'Natural',
    inputs: [''],
    sign: '',
    relative: 0
  },
  Sharped: {
    value: 'Sharped',
    inputs: ['s', 'S'],
    sign: '#',
    relative: 1
  },
  Flatted: {
    value: 'Flatted',
    inputs: ['f', 'F'],
    sign: '♭',
    relative: -1
  }
});

/**
 * 音高
 */
export interface Pitch extends BaseValue {
  base: Temperament;
  baseAccidental: Accidental;
  position: number;
}
export var PITCH: Immutable.Map < string, Pitch > = Immutable.fromJS((() => {
  var pitches = {};
  TEMPERAMENT.forEach(t => {
    ACCIDENTAL.forEach(a => {
      pitches[t.value + a.value] = {
        base: t,
        baseAccidental: a,
        position: normalizePosition(t.position + a.relative),
        value: t.value + a.value,
        inputs: combineInputs(t, a),
        sign: t.sign + a.sign
      }
    })
  });
  return pitches;
})());

var normalizePosition = (position: number) => {
  while (position < 0) position = position + OCTAVE;
  return position % OCTAVE;
};

var combineInputs = (...inputs: BaseValue[]) => {
  return inputs.reduce((base1, base2) => {
      var combined = {
        value: '',
        inputs: [],
        sign: ''
      };
      base1.inputs.forEach(i1 => {
        base2.inputs.forEach(i2 => {
          combined.inputs.push(i1 + i2);
        })
      });
      return combined;
    })
    .inputs;
};

/**
 * 第三音
 */
interface Triad extends BaseValue {}
var TRIAD: Immutable.Map < string, Triad > = Immutable.fromJS({
  Major: {
    value: 'Major',
    inputs: [''],
    sign: ''
  },
  Minor: {
    value: 'Minor',
    inputs: ['m'],
    sign: 'm'
  },
  Augmented: {
    value: 'Augmented',
    inputs: ['a', 'aug'],
    sign: 'aug'
  },
  Diminished: {
    value: 'Diminished',
    inputs: ['d', 'dim'],
    sign: 'dim'
  },
  Sus2: {
    value: 'Sus2',
    inputs: ['sus2', 's2'],
    sign: 'sus2'
  },
  Sus4: {
    value: 'Sus4',
    inputs: ['sus4', 's4'],
    sign: 'sus4'
  }
});

/**
 * 四和音
 */
interface Tetrad extends BaseValue {}
var TETRAD: Immutable.Map < string, Tetrad > = Immutable.fromJS({
  6: {
    value: '6',
    inputs: ['6'],
    sign: '6'
  },
  7: {
    value: '7',
    inputs: ['7'],
    sign: '7'
  },
  M7: {
    value: 'M7',
    inputs: ['M7'],
    sign: 'M7'
  },
  NoTetrad: {
    value: 'NoTetrad',
    inputs: [''],
    sign: ''
  }
});

/**
 * 五和音
 */
interface Pentad extends BaseValue {}
var PENTAD: Immutable.Map < string, Pentad > = Immutable.fromJS({
  9: {
    value: '9',
    inputs: ['9'],
    sign: '9'
  },
  11: {
    value: '11',
    inputs: ['11'],
    sign: '11'
  },
  13: {
    value: '13',
    inputs: ['13'],
    sign: '13'
  },
  NoPentad: {
    value: 'NoPentad',
    inputs: [''],
    sign: ''
  }
});

/**
 * 追加音
 */
interface Added extends BaseValue {}
var ADDED: Immutable.Map < string, Added > = Immutable.fromJS({
  Add9: {
    value: 'Add9',
    inputs: ['add9'],
    sign: 'add9'
  },
  Add11: {
    value: 'Add11',
    inputs: ['add11'],
    sign: 'add11'
  },
  NoAdded: {
    value: 'NoAdded',
    inputs: [''],
    sign: ''
  }
});

/**
 * 第五音
 */
interface Fifth extends BaseValue {}
var FIFTH: Immutable.Map < string, Fifth > = Immutable.fromJS({
  Flatted5: {
    value: 'Flatted5',
    inputs: ['-5'],
    sign: '-5'
  },
  Augmented5: {
    value: 'Augmented5',
    inputs: ['+5'],
    sign: '+5'
  },
  NoFifth: {
    value: 'NoFifth',
    inputs: [''],
    sign: ''
  }
});

/**
 * テンション
 */
interface Tension extends BaseValue {}
var TENSION: Immutable.Map<string,Tension> = Immutable.fromJS({

});

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
