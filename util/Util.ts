/// <reference path="../tsd/tsd.d.ts" />

class Util {

  private static _util: any = require('util');

  /**
   * extend
   */
  static extend: (...args: any[]) => any = Util._util._extend;
  static isArray: (arg: any) => boolean = Util._util.isArray;

  /**
   * 空白文字
   * @type {RegExp}
   */
  static SPACES = /\s+/g;
  private static ESCAPE_REGEXP = /([.*+?^=!:${}()|[\]\/\\])/g;

  /**
   * トリムする（ついでに全角スペースは半角スペースに変わる）
   * @param src
   */
  static trim(src: string): string {
    return src.replace('　', ' ')
      .trim();
  }

  /**
   *
   * @param src
   * @returns {string[]}
   */
  static split(src: string): string[] {
    return Util.trim(src)
      .split(Util.SPACES);
  }

  /**
   * ユーザ入力キーワードから正規表現文字列を作る際のエスケープ
   * @param src
   * @returns {string}
   */
  static escapeRegExp(src: string): string {
    return src.replace(Util.ESCAPE_REGEXP, "\\$1")
  }

  /**
   * 特定の文字列から始まるか判定
   * @param src
   * @param expect
   */
  static startsWith(src: string, expect: string): boolean {
    return src.lastIndexOf(expect, 0) === 0
  }

  /**
   * URL生成
   * @param artistName
   * @param songName
   * @param scoreNo
   * @returns {string}
   */
  static makeUri(artistName: string, songName: string, scoreNo: number): string {
    return '/' + encodeURIComponent(artistName) + '/' + encodeURIComponent(songName) + '/' + scoreNo.toString();
  }

  /**
   * string to number
   * @param num
   * @returns {null}
   */
  static toNumber(num: string): number {
    return ((n: number) => isNaN(n) ? null : n)(Number(num));
  }

  /**
   * 射影
   * @param srcJson 元データ(json)
   * @param fields 射影するフィールド(カンマ区切りの文字列)
   * @returns {*}
   */
  static project < T > (srcJson: T, fieldsString: string): T {
    if (!fieldsString) return srcJson;
    return fieldsString.split(',')
      .reduce((obj, field) => {
        if (srcJson[field]) obj[field] = srcJson[field];
        return obj;
      }, < T > {});
  }

  /**
   * 配列の要素が同じか比較する
   * @param a1
   * @param a2
   * @returns {boolean}
   */
  static isEqual(a1: any[], a2: any[]) {
    return a1.toString() === a2.toString();
  }

}

export = Util
