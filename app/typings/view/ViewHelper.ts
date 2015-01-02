var regPlus = /\+/g;
var regQuery = /([^&=]+)=?([^&]*)/g;


class ViewHelper {

  /**
   * 連続的なイベントを間引く
   * @param callback
   * @param duration
   */
  static thinOut(callback, duration: number = 200) {
    var timer: number;
    clearTimeout(timer);
    timer = setTimeout(callback, duration);
  }

  /**
   * クエリパラメータ取得
   * @returns {{}}
   */
  static getQueryParams(): any {
    var query = window.location.search.substring(1);
    var urlParams = {};
    var match;
    while (match = regQuery.exec(query))
      urlParams[decodeURIComponent(match[1])] = decodeURIComponent(match[2].replace(regPlus, " "));
    return urlParams
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

export = ViewHelper