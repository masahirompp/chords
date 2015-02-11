/// <reference path="../../../tsd/underscore/underscore.d.ts" />

/**
 *
 * @param thing
 */
export function fail(thing) {
  throw new Error(thing);
}

/**
 * 逆を返す関数を返す
 * @param pred
 * @returns {Function}
 */
export function complement(pred: Function) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  };
}

/**
 * 存在確認
 * @param x
 * @returns {boolean}
 * @description nullとundefinedのみfalseとなる。false,0,''はtrueとなる。
 * @example
 *  existy(null) => false
 *  existy(undefind) => false
 *  existy(false) => true
 *  existy(0) => true
 *  truthy('') => true
 */
export function existy(x) {
  return x != null;
}

/**
 * 真偽値確認
 * @param x
 * @returns {boolean}
 * @description 0と''もtrueとなる。null,undefined,falseのみfalseとなる。
 * @example
 *  truthy(null) => false
 *  truthy(undefind) => false
 *  truthy(false) => false
 *  truthy(0) => true
 *  truthy('') => true
 */
export function truthy(x) {
  return (x !== false) && existy(x);
}

/**
 * xと等価か判定する関数を返す
 * @param x
 * @return {function(any): boolean}
 */
export function equality(x) {
  return function(y) {
    return x === y;
  }
}

/**
 * 指定した関数の結果が１つでもtrueの場合真の値を返す関数を返す
 * @param funs
 * @return {function(...[any]): any}
 */
export function orify(...funs: Function[]) {
  function re(rFuns: Function[], rArgs) {
    if (rFuns.length === 0) {
      return void 0;
    }
    var fun = _.first(rFuns);
    var result = fun.apply(null, rArgs);
    if (truthy(result)) {
      return result;
    }
    return re(_.rest(rFuns), rArgs);
  }
  return function(...args) {
    return re(funs, args);
  }
}

/**
 * ArrayLikeなオブジェクトか(簡易)判定
 * @param x
 * @return {boolean}
 */
export function isArrayLike(x) {
  if (!_.isObject(x)) {
    return false;
  }
  return x.length === +x.length;
}

/**
 * カンマ区切りの引数を期待する関数に、配列で引数を渡すようにする。
 * @param fun
 * @returns {Function}
 * @example
 *  fun(1,2,3) => A
 *  splat(fun)([1,2,3]) => A
 */
export function splat(fun: Function) {
  return function(array: any[]) {
    return fun.apply(null, array);
  };
}

/**
 * 引数として配列を期待する関数に、カンマ区切りで引数を渡すように変換する
 * @param fun
 * @returns {Function}
 * @example
 *  fun([1,2,3]) => A
 *  unsplat(fun)(1,2,3) => A
 */
export function unsplat(fun: Function) {
  return function() {
    return fun.call(null, _.toArray(arguments));
  };
}

/**
 * condがtrueの場合のみactionを実行する
 * @param cond
 * @param action
 * @param args
 * @return {any}
 */
export function doWhen(cond, action: Function, ...args: any[]) {
  if (truthy(cond)) {
    return action.apply(action, args);
  }
  return void 0;
}

/**
 * 引数の既定値を設定した関数を返す
 * @param fun
 * @param defaults
 * @return {function(): any}
 */
export function fnull(fun: Function, ...defaults) {
  return function( /* args... */ ) {
    var args = _.map(arguments, function(e, i) {
      return existy(e) ? e : defaults[i];
    });
    return fun.apply(null, args);
  };
}

/**
 * 関数を実行し、結果がなければ既定値を返す関数を返す。
 * @param fun
 * @param defaultValue 既定値
 * @return {function(any): (...any|any)}
 */
export function invokeOrElse(fun, defaultValue) {
  return function(...args) {
    var result = fun.apply(fun, args);
    if (existy(result)) {
      return result;
    }
    return defaultValue
  };
}

/**
 * 即時実行関数を呼び出し時に実行すうようにする
 * @param fun
 * @param args
 * @return {function(): any}
 */
export function lazyInvoke(fun, ...args: any[]) {
  return function() {
    return fun.apply(fun, args);
  }
}

/**
 * 関数をポリモーフィックにする。
 * 引数の型(値 or array like)により、戻り値の型が変わる。
 * @param fun
 * @return {function(any, ...[any]): (any[]|any)}
 * @example
 *  polymorphic(toUpperCase)('aaa') => 'AAA';
 *  polymorphic(toUpperCase)(['aaa', 'bbb']) => ['AAA', 'BBB']
 *  polymorphic(toUpperCase)({m: 'aaa', n: 'bbb'}) => ['AAA', 'BBB']
 */
export function polymorphic(fun) {
  return function(target, ...args) {
    if (isArrayLike(target)) {
      return _.map(target, function(value) { /* keyなどの第二引数以降は渡さない */
        return fun.apply(this, construct(value, args));
      });
    }
    return fun.apply(target, arguments); /* arguments = construct(target, args) */
  };
}

/**
 * 配列の連結
 * @args [[*]...]
 * @returns {[*]}
 * @example
 *  cat([1,2], [3,4], [5,6,7])
 *  => [1,2,3,4,5,6,7]
 */
export function cat(...args: any[][]): any[] {
  var head: any[] = _.first(args);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  }
  return [];
}

/**
 * mapしてから配列の連結
 * @param fun mapの高階関数
 * @param coll [[*]|*...] 配列また要素の配列
 * @return {any[]}
 * @example
 *  mapcat(e => construct(e, ['a']), [1,2,3]))
 *  => [1,'a',2,'a',3,'a']
 */
export function mapcat(fun, coll): any[] {
  return cat.apply(null, _.map(coll, fun));
}

/**
 * 配列の先頭に追加
 * @param head
 * @param tail
 * @returns {*}
 * @example
 *  construct(42, [1,2,3])
 *  => [42,1,2,3]
 */
export function construct(head, tail: any[]) {
  return cat([head], _.toArray(tail));
}

/**
 * 対象フィールドを持つか判定する関数を返す
 * @param field
 * @return {function(any): boolean}
 */
export function hasOwnProperty(field: string) {
  return function(obj) {
    return obj.hasOwnProperty(field);
  };
}

/**
 * 特定のフィールドの値を返す関数を返す
 * @param field
 * @returns {function(any): any}
 * @example
 *  plucker('age')({name: 'moe', age: 50, userid: 'moe1'})
 *  => 50
 *  _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'age')
 *  => {age: 50}
 */
export function plucker(field: string) {
  return function(obj) {
    return (obj && obj[field]);
  };
}

/**
 * 特定のフィールドを再帰的に探す関数を返す
 * @param field
 * @return {function(any): any[]}
 * @example
 *  rePlucker('age')({moe:{ age: 50, id: aa}, mm:{ age: 22, id bb}, nn:{ id: cc })
 *  => [50,22]
 */
export function rePlucker(field: string) {
  var hasTargetField = hasOwnProperty(field);

  function re(obj) {
    if (!existy(obj)) {
      return void 0;
    }
    if (hasTargetField(obj)) {
      return [obj[field]];
    }
    if (_.isObject(obj)) {
      return _.map(obj, re);
    }
  }
  return _.compose(_.compact, _.flatten, re) /* (obj) */ ;
}

/**
 * 最も適切な値を返す。maxやminなどの抽象。
 * @param fun : x => y => boolean 比較関数
 * @param coll
 * @returns {*}
 */
export function best(fun: Function, coll: any[]) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

/**
 * 特定回数繰り返す
 * @param times
 * @param fun
 * @returns {*|Array}
 */
export function repeatedly(times: number, fun) {
  return _.map(_.range(times), fun);
}

// _.constant
///**
// * 常に同じ値(関数)を返す関数を返す
// * @param value
// * @returns {Function}
// */
//export function always(value) {
//  return function() {
//    return value;
//  };
//}

/**
*  対象オブジェクト(target)でメソッドを実行する関数を返す。
* @param name
* @param method
* @returns {Function}
* @example
*  var rev = invoker('reverse',Array.prototype.reverse);
*  _.map([[1,2,3],[4,5]],rev)
*  => [[3,2,1],[5,4]]
*/
export function invoker(name: string, method: Function) {
  return function(target /* ,args... */ ) {
    if (!existy(target)) {
      fail('Must provide a target');
    }

    var targetMethod = target[name];
    var args = _.rest(arguments);

    return doWhen((existy(targetMethod) && method === targetMethod), function() {
      return targetMethod.apply(target, args);
    });
  };
}

/**
 * 最初に値を返す関数の結果を返す関数を返す
 * @param funs
 * @return {function(...[any]): (any|any)}
 */
export function dispatch(...funs) {
  var size = funs.length;

  return function(...args) {
    var result;
    for (var i = 0; i < size; i++) {
      var fun = funs[i];
      result = fun.apply(fun, args);
      if (existy(result)) {
        return result;
      }
    }
    return result;
  };
}

/**
 * 引数1つのカリー化
 * @param fun
 * @returns {function(*):}
 */
export function curry(fun) {
  return function(arg) {
    return fun(arg);
  };
}

/**
 * 引数2つのカリー化(右から)
 * @param fun
 * @returns {Function}
 */
export function curry2(fun: Function) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg);
    };
  };
}

/**
 * 引数3つのカリー化(右から)
 * @param fun
 * @returns {Function}
 */
export function curry3(fun: Function) {
  return function(thirdArg) {
    return function(secondArg) {
      return function(firstArg) {
        return fun(firstArg, secondArg, thirdArg);
      };
    };
  };
}

/*
 */
/**
 * より大きい
 * @type {Function}
 * @example
 *  var greaterThan10 = greaterThan(10);
 *  greaterThan10(15) => true;
 */
export var greaterThan = curry2(function(l, r) {
  return l > r;
});

/**
 * より小さい
 * @type {Function}
 * @example
 *  lessThan(10)(11) => false
 */
export var lessThan = curry2(function(l, r) {
  return l < r;
});

// _.partial
///**
// *  部分適用
// *  function.bindで代用可能
// * @param fun
// * @returns {Function}
// */
//export function partial(fun: Function, ...pargs) {
//  return function( /* args... */ ) {
//    var args = cat(pargs, _.toArray(arguments));
//    return fun.apply(fun, args);
//  };
//}

/**
 * 検証関数
 * @param message
 * @param fun
 * @returns {Function}
 */
export function validator(message: string, fun: Function) {
  var f = function( /* args... */ ) {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}

/**
 *  condition1の「1」は引数1つ(=arg)の意味
 *  argに対してvalidatorsを実施し、エラーがなければfunを実行する関数を返す。
 * @returns {Function}
 */
export function condition1( /* validators */ ) {
  var validators = _.toArray(arguments);

  return function(fun: Function, arg) {
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors)) {
      return fail(errors.join(' '));
    }
    return fun(arg);
  };
}

// _.flatten
///**
// * 配列の再帰的なフラット化
// * @param array
// * @returns {*[]}
// * @example
// *  flat([[1,2],[3,4,[5,[6],[7,8]]]]) => [1,2,3,4,5,6,7,8]
// */
//export function flat(array) {
//  if (_.isArray(array)) {
//    cat.apply(cat, _.map(array, flat));
//  }
//  return [array];
//}

/**
 *
 * @param mapFun
 * @param resultFun
 * @param array
 * @returns {*}
 */
export function visit(mapFun, resultFun, array) {
  if (_.isArray(array)) {
    return resultFun(_.map(array, mapFun));
  }
  return resultFun(array);
}

/**
 *
 * @param fun
 * @param ary
 * @returns {*}
 */
export function postDepth(fun: Function, ary: any[]) {
  return visit(_.partial(postDepth, fun), fun, ary);
}

/**
 *
 * @param fun
 * @param ary
 * @returns {*}
 */
export function preDepth(fun: Function, ary: any[]) {
  return visit(_.partial(preDepth, fun), fun, fun(ary));
}

/**
 * 元のデータを変更しないextend
 * @returns {void|*}
 */
export function merge(...args) {
  return _.extend.apply(null, construct({}, args));
}

/**
 * 配列のすべての組み合わせについて、funを実行する。
 * @param fun 関数
 * @param cols 配列
 * @return {Array}
 * @example
 *  combination((x,y)=>x*y, [1,2,3], [4,5,6])
 *  => [4,5,6,8,10,12,12,15,18]
 */
export function combination(fun, ...cols: any[][]) {
  if (cols.length === 0) {
    return [fun()];
  }
  return mapcat(function(c) {
    return combination.apply(fun, construct(_.partial(fun, c), _.rest(cols)));
  }, _.first(cols));
}


/**
 * 遅延評価メソッドチェーン
 */
export class LazyChain {
  private _calls = [];
  private _target;

  /**
   * 遅延評価メソッドチェーン
   * @param obj
   * @constructor
   * @example
   *  new LazyChain([2,1,3]).invoke('sort').force();
   *  => [1,2,3]
   */
  constructor(obj) {
    var isLC = (obj instanceof LazyChain);
    this._calls = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
  }

  /**
   * 実行するメソッドを登録
   * @param methodName
   * @returns {LazyChain}
   */
  invoke(methodName: string, ...args) {
    this._calls.push(function(target) {
      var meth = target[methodName];
      return meth.apply(target, args);
    });
    return this;
  }

  /**
   * 評価
   * @returns {*}
   */
  force() {
    return _.reduce(this._calls, function(target, thunk: Function) {
      return thunk(target);
    }, this._target);
  }

  /**
   * _.tapと同じ位置づけ
   * @param fun
   * @returns {LazyChain}
   */
  tap(fun: Function) {
    this._calls.push(function(target) {
      fun(target);
      return target;
    });
    return this;
  }
}

var ESCAPE_REGEXP = /([.*+?^=!:${}()|[\]\/\\])/g; // 正規表現でエスケープが必要な文字
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
 * URL生成
 * @param paths
 * @returns {string}
 */
export function joinUrl(...paths: any[]): string {
  return paths.map(encodeURIComponent)
    .join('/');
}

/**
 * URLから階層の配列を取得
 * @returns {string[]}
 */
export function splitUrl(url: string): string[] {
  return existy(url) ? url.split('/')
    .filter(_.identity)
    .map(decodeURIComponent) : [];
}
