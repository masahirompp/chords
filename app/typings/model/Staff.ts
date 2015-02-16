import Util = require('../util/Util');
import Music = require('./Music');

/**
 * A4サイズ
 * @type {{HEIGHT: number, WIDTH: number}}
 */
export var A4 = {
  HEIGHT: 2970,
  WIDTH: 2100
};

/**
 * 印刷時のの余白
 * @type {{TOP: number, RIGHT: number, BOTTOM: number, LEFT: number}}
 */
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
var TITLE_BAR_WIDTH = 1000;
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
 * @type {{STAFF: string, GRAND: string, LINE: string}}
 */
var STAFF_TYPE = {
  STAFF: 'STAFF',
  GRAND: 'GRAND',
  LINE: 'LINE'
};

/**
 * 音記号
 * @type {{G: string, F: string}}
 */
var CLEF_TYPE = {
  G: 'G',
  F: 'F'
};

/**
 * 拍子
 * @type {{FOUR: number, THREE: number, SIX: number}}
 * @description 値は1小節に入る最大コード数
 */
var MUSICAL_TIME = {
  FOUR: 8,
  THREE: 6,
  SIX: 6
};


/**
 * 曲情報
 */
export interface ITrackInfo {
  isOriginal: boolean;
  title: string;
  artist: string;
  author: string;
  originalKey: string; // 原曲キー
  musicalTime: string; // 拍子
}

/**
 * 譜面設定値
 */
export interface IStaffSetting {
  showMusicalTime: boolean; // 拍子の表示有無
  staffType: string; // 譜面タイプ
  showClef: boolean; // 音号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  clefType: string; // 音号の種類(STAFF_TYPEがSTAFF)
  showKeySignature ? : boolean; // 調号の表示(STAFF_TYPEがSTAFF,GRANDのとき必須)
  transposition ? : string; // 移調キー
  lineSpace: number; //線間の幅
  fontSize: number;
  offset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    title: number;
    section: number;
  }
}

/**
 * 譜面設定値の既定値
 * @type {{showMusicalTime: boolean, staffType: string, showClef: boolean, clefType: string, showKeySignature: boolean, transposition: null, lineSpace: number, fontSize: number, offset: {top: number, right: number, bottom: number, left: number, title: number, section: number}}}
 */
var defaultSettings: IStaffSetting = {
  showMusicalTime: true,
  staffType: STAFF_TYPE.STAFF,
  showClef: true,
  clefType: CLEF_TYPE.G,
  showKeySignature: true,
  transposition: null, // 移調キー
  lineSpace: 10,
  fontSize: 15,
  offset: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    title: 5,
    section: 5
  }
};

/**
 * 譜面部の(1ページの)高さ
 * @param settings
 * @return {number}
 */
function contentHeight(settings: IStaffSetting) {
  return A4.HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - settings.offset.top - settings.offset.bottom;
}

/**
 * 五線譜の高さ
 * @param settings
 * @return {number}
 */
function staffHeight(settings: IStaffSetting) {
  var cases = _.object([
    STAFF_TYPE.LINE, () => SINGLE_STAFF_HEIGHT
  ], [
    STAFF_TYPE.STAFF, () => settings.lineSpace * 4
  ], [
    STAFF_TYPE.GRAND, () => settings.lineSpace * 8 + GRANDSTAFF_SPACE
  ]);
  return Util.match(cases)(settings.staffType);
}

/**
 * 五線譜の幅
 * @param settings
 * @return {number}
 */
function staffWidth(settings: IStaffSetting) {
  return A4.WIDTH - MARGIN.RIGHT - MARGIN.LEFT - settings.offset.right - settings.offset.left;
}

/**
 * 音間によるスケール値を取得
 * @param x
 * @param lineSpace
 * @return {number}
 */
function scaleSign(x, lineSpace) {
  return x * lineSpace / BASE_LINE_SPACE;
}

/**
 * 音号の幅を返す関数を返す
 * @param settings
 * @return {function(any): (number|number)}
 */
function clefWidth(settings: IStaffSetting) {
  return function(clef) {
    if (settings.staffType === STAFF_TYPE.LINE) {
      return 0;
    }
    return settings.showClef ? scaleSign(clef.width, settings.lineSpace) : 0;
  }
}

/**
 * 使用する音記号の一覧
 * @param settings
 * @return {string[]}
 */
export function useClefs(settings: IStaffSetting) {
  if (settings.staffType === STAFF_TYPE.LINE || !settings.showClef) {
    return [];
  }
  if (settings.staffType === STAFF_TYPE.STAFF) {
    return [settings.clefType];
  }
  return [CLEF_TYPE.G, CLEF_TYPE.F];
}

/**
 * 調号の幅を返す関数を返す
 * @param settings
 * @return {function(): number}
 */
function keySignatureWidth(settings: IStaffSetting, trackInfo: ITrackInfo) {
  return function() {
    var signatureCount = Music.getSignature(settings.transposition || trackInfo.originalKey);
    if (settings.staffType === STAFF_TYPE.LINE || !settings.showKeySignature || signatureCount === 0) {
      return 0;
    }
    return scaleSign(KEY_SIGNATURE_WIDTH_BASE + KEY_SIGNATURE_WIDTH_STEP * (signatureCount - 1), settings.lineSpace);
  }
}

/**
 * 拍子の幅を返す関数を返す
 * @param settings
 * @return {function(): number}
 */
function musicalTimeWidth(settings: IStaffSetting) {
  return function() {
    return settings.showMusicalTime ? scaleSign(MUSICAL_TIME_WIDTH, settings.lineSpace) : 0;
  }
}

/**
 * 1小節の幅を返す関数を返す関数
 * @param settings
 * @return {function(any, number): number}
 */
export function barWidth(settings: IStaffSetting, trackInfo: ITrackInfo) {
  return function(clef) {
    return (staffWidth(settings) -
      clefWidth(settings)(clef) -
      keySignatureWidth(settings, trackInfo)() -
      musicalTimeWidth(settings)()) / BAR_COUNT;
  }
}

/**
 * 一番左の小節の幅を返す関数を返す関数
 * @param settings
 * @param trackInfo
 * @return {function(any): number}
 */
export function firstBarWidth(settings: IStaffSetting, trackInfo: ITrackInfo) {
  return function(clef) {
    // 全体からbarWidth3つ分を引いた残りが最初のbarWidth
    return staffWidth(settings) - (barWidth(settings, trackInfo)(clef) * (BAR_COUNT - 1));
  }
}

/**
 * 五線定義の各線の高さの位置を返す。
 * @param settings
 * @return {number[]}
 */
export function defLineYs(settings: IStaffSetting) {
  var cases = _.object([
    // 1本線の場合は、高さの中央に1本線を引く [5]
    STAFF_TYPE.LINE, () => [SINGLE_STAFF_HEIGHT / 2]
  ], [
    // 5線の場合は、lineSpaceの間を空けた先を5本引く [0,10,20,30,40]
    STAFF_TYPE.STAFF, () => _.map(_.range(0, 4), d => settings.lineSpace * d)
  ], [
    // 二段組楽譜の場合 [0,10,20,30,40,100,110,120,130,140]
    STAFF_TYPE.GRAND, () => Util.cat(
      _.map(_.range(0, 4), d => settings.lineSpace * d),
      _.map(_.range(0, 4), d => settings.lineSpace * d + GRANDSTAFF_SPACE))
  ]);
  return Util.match(cases)(settings.staffType);
}

