/// <reference path="../../../tsd/d3/d3.d.ts" />

/**
 * ブラウザの幅に合わせて縮尺した値を返す関数を返す。
 * @param browserWidth ブラウザの幅
 * @param baseWidth 基底幅
 * @param digits 返却値の小数点以下の桁数。既定値は0。
 * @return {function(number): number}
 */
export function floor(browserWidth: number, baseWidth: number, digits: number = 0) {
  var pow = Math.pow(10, digits);
  var scale = d3.scale.linear()
    .domain([0, baseWidth])
    .range([0, browserWidth]);
  return _.memoize(function(x) {
    return scale(x * pow) / pow;
  });
}