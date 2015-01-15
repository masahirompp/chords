var SPACES = /[\s　]+/g; // 空白文字
var ESCAPE_REGEXP = /([.*+?^=!:${}()|[\]\/\\])/g; // 正規表現でエスケープが必要な文字

/**
 * トリムする（ついでに全角スペースは半角スペースに変わる）
 * @param src
 */
export function trim(src: string): string {
  return src ? src.replace(SPACES, ' ')
    .trim() : '';
}

/**
 *
 * @param src
 * @returns {string[]}
 */
export function split(src: string): string[] {
  return trim(src)
    .split(SPACES);
}

/**
 * ユーザ入力キーワードから正規表現文字列を作る際のエスケープ
 * @param src
 * @returns {string}
 */
export function escapeRegExp(src: string): string {
  return src.replace(ESCAPE_REGEXP, "\\$1")
}

/**
 * 特定の文字列から始まるか判定
 * @param src
 * @param expect
 */
export function startsWith(src: string, expect: string): boolean {
  return src.lastIndexOf(expect, 0) === 0
}

/**
 * 組み合わせ処理
 * @param array1
 * @param array2
 * @param func
 */
export function combination < T, S, R > (array1: T[], array2: S[], func: (src1: T, src2: S) => R): R[] {
  var result: R[] = [];
  array1.forEach(src1 => {
    array2.forEach(src2 => {
      var tmp = func(src1, src2);
      if (tmp) result.push(tmp);
    });
  });
  return result;
}

/**
 * URL生成
 * @param paths
 * @returns {string}
 */
export function joinUrl(...paths: string[]): string {
  return paths.map(path => encodeURIComponent(path))
    .join('/');
}

/**
 * URLから階層の配列を取得
 * @returns {string[]}
 */
export function splitUrl(): string[] {
  var cache = {};
  var path = location.pathname;
  return (path in cache) ? cache[path] : cache[path] = location.pathname.split('/')
    .filter(path => !!path)
    .map(path => decodeURIComponent(path));
}