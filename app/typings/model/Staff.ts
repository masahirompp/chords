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
 * 譜面タイプ
 */
var STAFF_TYPE = {
  STAFF: 'staff',
  GRAND: 'grand',
  LINE: 'line'
};

/**
 * 拍子
 */
var MUSICAL_TIME = {
  FOUR: 8,
  THREE: 6,
  SIX: 6
};

/**
 * D3.Scale Util
 */
module Scale {

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
 * 設定値
 */
export interface IStaffSetting {
  showMusicalTime: boolean; // 拍子の表示有無
  staffType: string; // 譜面タイプ
  showClef: boolean; // 音号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  clefType: string; // 音号の種類(STAFF_TYPEがSTAFF)
  showKeySignature ? : boolean; // 調号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  key: string; // キー
  lineSpace: number; //線間の幅
  musicalTime: string; // 拍子
  fontSize: number;
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
function clefWidth(staffType: string, showClef: boolean, clef) {
  if (staffType === STAFF_TYPE.LINE) {
    return 0;
  }
  return showClef ? clef.width : 0;
}

/**
 * 調号の幅
 * @param staffType 譜面タイプ
 * @param showKeySignature 調号の表示
 * @param key 調
 * @returns {number}
 */
function keySignatureWidth(staffType: string, showKeySignature: boolean, key: string) {
  if (staffType === STAFF_TYPE.LINE || !showKeySignature) {
    return 0;
  }
  var Music = require('./Music');
  var sigunatureCount = Music.Signature.getSignatureFromSign(key)
    .length;
  return sigunatureCount ? KEY_SIGNATURE_WIDTH_BASE + KEY_SIGNATURE_WIDTH_STEP * (sigunatureCount - 1) : 0;
}
