/// <reference path="../tsd/tsd.d.ts" />

class Util {

  static _util = require('util');
  static extend: (...args: any[]) => any = Util._util._extend;

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

}

export = Util
