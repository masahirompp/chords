/// <reference path="../../../tsd/d3/d3.d.ts" />

/**
 * 全体
 */
var A4_HEIGHT = 2970;
var A4_WIDTH = 2100;
var MARGIN = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 10,
  LEFT: 10
};
var BAR_COUNT = 4;

/**
 * 幅関連
 */
var TITLE_BAR_WIDTH = 500;
var MUSICAL_TIME_WIDTH = 50;
var KEY_SIGNATURE_WIDTH_BASE = 10;
var KEY_SIGNATURE_WIDTH_STEP = 10;

/**
 * 高さ関連
 */
var SINGLE_STAFF_HEIGHT = 100;
var BASE_LINE_SPACE = 20;
var GRANDSTAFF_SPACE = 200;
var STAFF_SPACE = 200;
var OFFSET_TITLE = 100;
var UNDERLINE_SPACE = 20;

/**
 * 音号
 */
module CLEF {

  export enum TYPE {
    G, F
  }

  export var G = {
    id: 'GClef',
    path: 'M12.049 3.53c.305 3.126-2.019 5.656-4.077 7.701l-.644.594c-.102-.479-.299-1.731-.28-2.11.13-2.694 2.32-6.588 4.238-8.024.309.577.563.623.763 1.838zm.651 16.142c-1.232-.906-2.85-1.144-4.334-.885l-.574-3.764c2.351-2.329 4.907-5.032 5.041-8.539.059-2.232-.276-4.671-1.678-6.484-1.7.128-2.9 2.156-3.802 3.417-1.489 2.671-1.141 5.917-.57 8.796-.809.952-1.93 1.743-2.727 2.734-2.356 2.308-4.409 5.43-4.005 8.878.183 3.334 2.589 6.434 5.87 7.227 1.246.315 2.564.346 3.824.099.22 2.25 1.027 4.629.092 6.813-.701 1.598-2.788 3.004-4.332 2.192l-.478-.252c1.07-.257 2-1.036 2.26-1.565.838-1.464-.4-3.639-2.155-3.358-2.262.046-3.19 3.14-1.736 4.685 1.347 1.52 3.833 1.312 5.43.318 1.813-1.18 2.039-3.544 1.833-5.562-.07-.678-.403-2.67-.444-3.387.697-.249.209-.059 1.193-.449 2.66-1.053 4.357-4.259 3.594-7.122-.318-1.469-1.044-2.914-2.302-3.792zm.561 5.757c.214 1.991-1.053 4.321-3.079 4.96-.136-.795-.172-1.011-.263-1.475-.482-2.46-.744-4.987-1.116-7.481 1.625-.168 3.458.543 4.023 2.184.244.577.343 1.197.435 1.812zm-5.149 5.196c-2.544.141-5-1.595-5.634-4.081-.749-2.153-.528-4.63.821-6.504 1.115-1.702 2.607-3.105 4.029-4.543l.549 3.382c-2.991.782-5.005 4.725-3.215 7.451.532.764 1.976 2.223 2.765 1.634-1.102-.683-2.003-1.859-1.81-3.227-.082-1.282 1.37-2.911 2.651-3.198.438 2.869.941 6.073 1.38 8.943-.505.1-1.021.143-1.536.143z',
    width: 20,
    offset: -35, // scale考慮済みの値
    scale: 3.7
  };

  export var F = {
    id: 'FClef',
    path: 'M17.312 3.145c.008.369-.15.739-.431.98-.36.329-.909.396-1.358.229-.445-.172-.774-.612-.799-1.09-.034-.374.085-.766.356-1.032.255-.272.635-.405 1.004-.382.38.008.747.2.973.504.175.224.257.509.255.792zM17.312 8.988c.008.37-.149.739-.431.981-.36.329-.909.396-1.358.229-.445-.172-.774-.612-.799-1.091-.035-.374.092-.761.356-1.031.25-.278.634-.405 1.001-.383.484.013.923.343 1.123.775.074.163.109.342.108.52zM13.031 7.211c.045 2.825-1.215 5.57-3.214 7.537-2.489 2.488-5.747 4.071-9.067 5.128-.442.239-1.108-.076-.412-.401 1.338-.609 2.728-1.131 3.96-1.951 2.722-1.683 5.02-4.334 5.577-7.562.325-1.965.234-4.011-.258-5.94-.361-1.419-1.345-2.883-2.901-3.093-1.413-.216-2.915.273-3.923 1.295-.265.269-.781 1.013-.696 1.867.602-.473.561-.42 1.055-.64 1.137-.507 2.644.214 2.928 1.466.302 1.15.069 2.614-1.067 3.227-1.185.645-2.934.378-3.596-.891-1.095-1.954-.493-4.627 1.278-5.983 1.803-1.496 4.434-1.555 6.558-.787 2.185.812 3.487 3.076 3.697 5.318.057.468.082.94.082 1.411z',
    width: 20,
    offset: 0,
    scale: 4
  };

  export function get(clef: TYPE) {
    return clef === TYPE.G ? G : F;
  }
}

/**
 * D3.Scale Util
 */
module Scale {

  // TODO memoize

  function getScale(browserWidth: number) {
    return d3.scale.linear()
      .domain([0, A4_WIDTH])
      .range([0, browserWidth]);
  }

  export function calc(browserWidth: number, x: number) {
    return Math.floor(getScale(browserWidth)(x) * 100) / 100; // 小数点第二位まで求める。
  }

  export function floor(browserWidth: number, x: number) {
    return Math.floor(getScale(browserWidth)(x));
  }
}

/**
 * 譜面タイプ
 */
export enum STAFF_TYPE {
  STAFF, GRAND, LINE
}

/**
 * 拍子
 */
export enum MUSICAL_TIME {
  FOUR, THREE, SIX
}

/**
 * 設定値
 */
export interface IStaffSetting {
  showMusicalTime: boolean; // 拍子の表示有無
  staffType: STAFF_TYPE; // 譜面タイプ
  showClef ? : Boolean; // 音号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  clefType ? : CLEF.TYPE; // 音号の種類(STAFF_TYPEがSTAFF)
  showKeySignature ? : boolean; // 調号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  key: string; // キー
  lineSpace: number; //線間の幅
  musicalTime: MUSICAL_TIME; // 拍子
  fontSize: number;
}

/**
 * 拍子から1小節に埋め込み可能なコード数
 * @param musicalTime
 * @returns {number}
 */
function numberOfChordsPerBar(musicalTime: MUSICAL_TIME) {
  if (musicalTime === MUSICAL_TIME.FOUR) {
    return 8;
  }
  return 6;
}

/**
 * 五線譜の幅
 * @param width 紙全体の幅
 * @param marginLeft 左余白
 * @param marginRight 右余白
 * @returns {number} 五線譜の幅
 */
function staffWidth(width: number, marginLeft: number, marginRight: number) {
  return width - marginLeft - marginRight;
}

/**
 * 拍子の幅
 * @param showMusicalTime 拍子の表示
 * @returns {number}
 */
function musicalTimeWidth(showMusicalTime: boolean) {
  return showMusicalTime ? MUSICAL_TIME_WIDTH : 0;
}

/**
 * 音号の幅
 * @param staffType 譜面タイプ
 * @param showClef 音号の表示
 * @param clef 音号
 * @returns {number}
 */
function clefWidth(staffType: STAFF_TYPE, showClef: boolean, clef: CLEF.TYPE) {
  if (staffType === STAFF_TYPE.LINE) {
    return 0;
  }
  return showClef ? CLEF.get(clef)
    .width : 0;
}

/**
 * 調号の幅
 * @param staffType 譜面タイプ
 * @param showKeySignature 調号の表示
 * @param key 調
 * @returns {number}
 */
function keySignatureWidth(staffType: STAFF_TYPE, showKeySignature: boolean, key: string) {
  if (staffType === STAFF_TYPE.LINE || !showKeySignature) {
    return 0;
  }
  var Music = require('./Music');
  var sigunatureCount = Music.Signature.getSignatureFromSign(key)
    .length;
  return sigunatureCount ? KEY_SIGNATURE_WIDTH_BASE + KEY_SIGNATURE_WIDTH_STEP * (sigunatureCount - 1) : 0;
}
