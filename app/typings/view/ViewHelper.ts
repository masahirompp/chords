var regPlus = /\+/g;
var regQuery = /([^&=]+)=?([^&]*)/g;
var regSpace = /[\s　]+/g;

/**
 * トリムする（ついでに全角スペースは半角スペースに変わる）
 * @param src
 * @return string
 */
export function trim(src: string) {
  return src ? src.replace(regSpace, ' ')
    .trim() : '';
}

/**
 * スペースで分割する
 * @param src
 * @returns {string[]}
 */
export function split(src: string) {
  return trim(src)
    .split(regSpace);
}

var timer: number;
/**
 * 連続的なイベントを間引く
 * @param callback
 * @param duration
 */
export function thinOut(callback, duration: number = 200) {
  clearTimeout(timer);
  timer = setTimeout(callback, duration);
}

/**
 * クエリパラメータ取得
 * @return {{}}
 * @example
 *  ?q=nnn&name=A+B
 *  => { q: 'nnn', name: 'A B'}
 */
export function getQueryParams(): any {
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
export function joinUrl(...paths: string[]) {
  return paths.map(path => encodeURIComponent(path))
    .join('/');
}
