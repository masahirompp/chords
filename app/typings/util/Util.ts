import Map = require('./Dictionary');

class Util {

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
    return '?' + key + '=' + value.split(/[ 　]+/g)
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