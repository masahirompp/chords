/**
 * A4サイズ
 * @type {{HEIGHT: number, WIDTH: number}}
 */
var A4 = {
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
  STAFF: 'staff',
  GRAND: 'grand',
  LINE: 'line'
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
  if (settings.staffType === STAFF_TYPE.LINE) {
    return SINGLE_STAFF_HEIGHT;
  }
  if (settings.staffType === STAFF_TYPE.STAFF) {
    return settings.lineSpace * 4;
  }
  if (settings.staffType === STAFF_TYPE.GRAND) {
    return settings.lineSpace * 8 + GRANDSTAFF_SPACE;
  }
  return 0;
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
 * 調号の幅を返す関数を返す
 * @param settings
 * @return {function(number): number}
 */
function keySignatureWidth(settings: IStaffSetting) {
  return function(signatureCount: number) {
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
function barWidth(settings: IStaffSetting) {
  return function(clef, signatureCount: number) {
    return staffWidth(settings) -
      clefWidth(settings)(clef) -
      keySignatureWidth(settings)(signatureCount) -
      musicalTimeWidth(settings)();
  }
}
