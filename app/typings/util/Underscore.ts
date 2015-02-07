/// <reference path="../../../tsd/underscore/underscore.d.ts" />

import _ = require('underscore');

function extend(_) {

  /**
   *
   * @param thing
   */
  function fail(thing) {
    throw new Error(thing);
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
  function existy(x) {
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
  function truthy(x) {
    return (x !== false) && existy(x);
  }

  /**
   * カンマ区切りの引数を期待する関数に、配列で引数を渡すようにする。
   * @param fun
   * @returns {Function}
   * @example
   *  fun(1,2,3) => A
   *  splat(fun)([1,2,3]) => A
   */
  function splat(fun: Function) {
    return function(array) {
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
  function unsplat(fun: Function) {
    return function() {
      return fun.call(null, _.toArray(arguments));
    };
  }

  /**
   * condがtrueの場合のみactionを実行する
   * @param cond
   * @param action
   * @returns {*}
   */
  function doWhen(cond, action: Function) {
    if (truthy(cond)) {
      return action();
    }
    return void 0;
  }

  /**
   * 逆を返す関数を返す
   * @param pred
   * @returns {Function}
   */
  function complement(pred: Function) {
    return function() {
      return !pred.apply(null, _.toArray(arguments));
    };
  }

  /**
   * 真偽値反転
   * @param x
   * @returns {boolean}
   */
  function not(x) {
    return !x;
  }

  /**
   * 配列の連結
   * @args [[*]...]
   * @returns {*}
   * @example
   *  cat([1,2], [3,4], [5,6,7])
   *  => [1,2,3,4,5,6,7]
   */
  function cat(...args) {
    var head = _.first(args);
    if (existy(head)) {
      return head.concat.apply(head, _.rest(arguments));
    }
    return [];
  }

  /**
   * mapしてから配列の連結
   * @param fun mapの高階関数
   * @param coll [[*]|*...] 配列また要素の配列
   * @returns {*}
   * @example
   *  mapcat(e => construct(e, ['a']), [1,2,3]))
   *  => [1,'a',2,'a',3,'a']
   */
  function mapcat(fun: Function, coll: any[]) {
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
  function construct(head, tail: any[]) {
    return cat([head], _.toArray(tail));
  }

  /**
   * 特定のフィールドを返す関数を返す
   * @param field
   * @returns {Function}
   */
  function plucker(field: string) {
    return function(obj) {
      return (obj && obj[field]);
    };
  }

  /**
   * 最も適切な値を返す。maxやminなどの抽象。
   * @param fun : x => y => boolean 比較関数
   * @param coll
   * @returns {*}
   */
  function best(fun: Function, coll: any[]) {
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
  function repeatedly(times: number, fun: Function) {
    return _.map(_.range(times), fun);
  }

  /**
   * 常に同じ値(関数)を返す関数を返す
   * @param value
   * @returns {Function}
   */
  function always(value) {
    return function() {
      return value;
    };
  }

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
  function invoker(name: string, method: Function) {
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
   * 引数の既定値を設定した関数を返す
   * @param fun
   * @returns {Function}
   */
  function fnull(fun: Function /* ,defaults... */ ) {
    var defaults = _.rest(arguments);
    return function( /* args... */ ) {
      var args = _.map(arguments, function(e, i) {
        return existy(e) ? e : defaults[i];
      });
      return fun.apply(null, args);
    };
  }

  /**
   * ポリモーフィックな関数を生成
   * @returns {Function}
   * @example
   *  引数の型(StringとArray)によって計算方法を変える関数を返す例
   *  var str = dispatch(invoker('toString', Array.prototype.toString),
   *  invoker('toString', String.prototype.toString));
   *  str('a')
   *  => 'a'
   *  str([1,2,3,4])
   *  => '1,2,3,4'
   */
  function dispatch( /* functions... */ ) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    /* このtargetはinvokerのtargetに相当する */
    return function(target /*, args... */ ) {
      var result, args = _.rest(arguments);
      for (var i = 0; i < size; i++) {
        var fun = funs[i];
        result = fun.apply(fun, construct(target, args));
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
   * @returns {Function}
   */
  function curry(fun: Function) {
    return function(arg) {
      return fun(arg);
    };
  }

  /**
   * 引数2つのカリー化(右から)
   * @param fun
   * @returns {Function}
   */
  function curry2(fun: Function) {
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
  function curry3(fun: Function) {
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
  var greaterThan = curry2(function(l, r) {
    return l > r;
  });

  /**
   * より小さい
   * @type {Function}
   * @example
   *  lessThan(10)(11) => false
   */
  var lessThan = curry2(function(l, r) {
    return l < r;
  });

  /**
   *  部分適用
   *  function.bindで代用可能
   * @param fun
   * @returns {Function}
   */
  function partial(fun: Function, ...pargs) {
    return function( /* args... */ ) {
      var args = cat(pargs, _.toArray(arguments));
      return fun.apply(fun, args);
    };
  }

  /**
   * 検証関数
   * @param message
   * @param fun
   * @returns {Function}
   */
  function validator(message: string, fun: Function) {
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
  function condition1( /* validators */ ) {
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

  /**
   * argsに対してpredsがすべて真の場合trueを返す関数を返す。
   * @returns {Function}
   * @example
   *  andify(isNumber, isEven)(1,2,3) => false
   *  andify(isNumber, isEven)(2,4,6) => true
   */
  function andify( /* preds */ ) {
    var preds = _.toArray(arguments);

    return function( /* args */ ) {
      var args = _.toArray(arguments);

      var everything = function(ps, truth) {
        if (_.isEmpty(ps)) {
          return truth;
        }
        return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
      };
      return everything(preds, true);
    };
  }

  /**
   * argsに対するpredsが1つでも真の場合trueを返す関数を返す。
   * @returns {Function}
   * @example
   *  orify(idOdd, isZero)() => false;
   *  orify(idOdd, isZero)(0,2,4,6) => true;
   *  orify(idOdd, isZero)(2,4,6) => false;
   */
  function orify( /* preds */ ) {
    var preds = _.toArray(arguments);

    return function( /* args */ ) {
      var args = _.Array(arguments);

      var something = function(ps, truth) {
        if (_.isEmpty(ps)) {
          return truth;
        }
        return _.some(args, _.first(ps)) || something(_.rest(ps), truth);
      };
      return something(preds, false);
    };
  }

  /**
   * 配列の再帰的なフラット化
   * @param array
   * @returns {*[]}
   * @example
   *  flat([[1,2],[3,4,[5,[6],[7,8]]]]) => [1,2,3,4,5,6,7,8]
   */
  function flat(array: any[]) {
    if (_.isArray(array)) {
      cat.apply(cat, _.map(array, flat));
    }
    return [array];
  }

  /**
   *
   * @param mapFun
   * @param resultFun
   * @param array
   * @returns {*}
   */
  function visit(mapFun: Function, resultFun: Function, array: any[]) {
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
  function postDepth(fun: Function, ary: any[]) {
    return visit(partial(postDepth, fun), fun, ary);
  }

  /**
   *
   * @param fun
   * @param ary
   * @returns {*}
   */
  function preDepth(fun: Function, ary: any[]) {
    return visit(partial(postDepth, fun), fun, fun(ary));
  }

  /**
   * 元のデータを変更しないextend
   * @returns {void|*}
   */
  function merge(...args) {
    return _.extend.apply(null, construct({}, args));
  }

  /**
   * 遅延評価メソッドチェーン
   * @param obj
   * @constructor
   * @example
   *  new LazyChain([2,1,3]).invoke('sort').force();
   *  => [1,2,3]
   */
  function LazyChain(obj) {
    var isLC = (obj instanceof LazyChain);

    this._calls = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
  }

  /**
   * 実行するメソッドを登録
   * @param methodName
   * @returns {LazyChain}
   */
  LazyChain.prototype.invoke = function(methodName: string /* args */ ) {
    var args = _.rest(arguments);

    this._calls.push(function(target) {
      var meth = target[methodName];
      return meth.apply(target, args);
    });

    return this;
  };

  /**
   * 評価
   * @returns {*}
   */
  LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, thunk) {
      return thunk(target);
    }, this._target);
  };

  /**
   * _.tapと同じ位置づけ
   * @param fun
   * @returns {LazyChain}
   */
  LazyChain.prototype.tap = function(fun: Function) {
    this._calls.push(function(target) {
      fun(target);
      return target;
    });
    return this;
  };

  return {
    existy: existy,
    truthy: truthy,
    splat: splat,
    unsplat: unsplat,
    doWhen: doWhen,
    complement: complement,
    not: not,
    cat: cat,
    mapcat: mapcat,
    construct: construct,
    plucker: plucker,
    best: best,
    repeatedly: repeatedly,
    always: always,
    invoker: invoker,
    fnull: fnull,
    dispatch: dispatch,
    curry: curry,
    curry2: curry2,
    curry3: curry3,
    partial: partial,
    validator: validator,
    condition1: condition1,
    andify: andify,
    orify: orify,
    flat: flat,
    visit: visit,
    postDepth: postDepth,
    preDepth: preDepth,
    merge: merge,
    LazyChain: LazyChain,
    greaterThan: greaterThan,
    lessThan: lessThan
  }
}

_.mixin(extend(_));

export = _