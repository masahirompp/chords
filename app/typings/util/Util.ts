import Map = require('./Dictionary');

class Util {

  /**
   * 空白文字
   * @type {RegExp}
   */
  static SPACES = /[\s　]+/g;
  private static ESCAPE_REGEXP = /([.*+?^=!:${}()|[\]\/\\])/g;

  /**
   * トリムする（ついでに全角スペースは半角スペースに変わる）
   * @param src
   */
  static trim(src: string): string {
    return src.replace(Util.SPACES, ' ')
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
   * クエリパラメータを取得
   * @param name
   * @returns {string}
   */
  static getQueryByName(name: string): string {
    var regex = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\[")
      .replace(/[\]]/, "\\]") + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /**
   * クエリパラメータ作成
   * @param key
   * @param value
   * @returns {string}
   */
  static makeQueryParameter(key: string, value: string): string {
    if (!value) {
      return '';
    }
    return '?' + key + '=' + value.split(/[\s　]+/g)
      .map(d => encodeURIComponent(d))
      .join('+');
  }

  /**
   * URL生成
   * @param paths
   * @returns {string}
   */
  static joinUrl(...paths: string[]): string {
    return paths.map(path => encodeURIComponent(path))
      .join('/');
  }

  /**
   * URLから階層の配列を取得
   * @returns {string[]}
   */
  static splitUrl(): string[] {
    var cache = {};
    var path = location.pathname;
    return (path in cache) ? cache[path] : cache[path] = location.pathname.split('/')
      .filter(path => !!path)
      .map(path => decodeURIComponent(path));
  }
}

export = Util
