define(function(require) {
  'use strict';

  var util = require('util/Util');
  var music = require('model/Music');

  describe('Util', function() {
    describe('complement', function() {
      it('必ずtrueを返す関数のテスト', function() {
        _.identity(true).should.be.true;
      });
      it('必ずtrueを返す関数の逆の関数は、必ずfalseを返すテスト', function() {
        util.complement(_.identity)(true).should.be.false;
      });
    });

    describe('orify', function() {
      var aOrb = util.orify(util.equality('a'), util.equality('b'))
      it('orify(a,b)(a) => true', function() {
        aOrb('a').should.be.true;
      });
      it('orify(a,b)(b) => true', function() {
        aOrb('b').should.be.true;
      });
      it('orify(a,b)(c) => undefined', function() {
        (aOrb('c') === undefined).should.be.ture;
      });
    });

    describe('fnull', function() {
      var getOrElse = util.fnull(_.identity, 'default');
      it('既定値を返す関数に"aaa"を渡すテスト', function() {
        getOrElse('aaa').should.equal('aaa');
      });
      it('既定値を返す関数にnullを渡すテスト', function() {
        getOrElse(null).should.equal('default');
      });
    });

    describe('invokeOrElse', function() {
      var getOrElse = util.fnull(_.identity, 'default');
      var invokeOrElse = util.invokeOrElse(getOrElse, 'default2');
      it('引数を１つ取る関数に、引数を一つ渡すテスト', function() {
        invokeOrElse('aaa').should.equal('aaa');
      });
      it('引数を１つ取る関数に、引数を渡さずundefinedが返され、既定値が返されるテスト', function() {
        invokeOrElse().should.equal('default2');
      });
    });

    describe('polymorphicBind', function() {
      var toUpperCase = util.polymorphicBind(''.toUpperCase);
      it('toUpperCase("aaa") => "AAA"', function() {
        toUpperCase('aaa').should.equal('AAA');
      });
      it('toUpperCase(["aaa","bbb"]) => ["AAA","BBB"]', function() {
        var result = toUpperCase(['aaa', 'bbb']);
        result.should.eql(['AAA', 'BBB']);
      });
      it('toUpperCase({m:"aaa",n:"bbb"}) => ["AAA","BBB"]', function() {
        var result = toUpperCase({m: "aaa", n: "bbb"});
        result.should.eql(['AAA', 'BBB']);
      });
    });

    describe('polymorphic', function() {
      var escape = util.polymorphic(_.escape);
      it('escape("a&a") => "a&amp;a"', function() {
        escape('a&a').should.equal('a&amp;a');
      });
      it('escape(["a&a","b&b"]) => ["a&amp;a","b&amp;b"]', function() {
        var result = escape(['a&a', 'b&b']);
        result.should.eql(['a&amp;a', 'b&amp;b']);
      });
      it('toUpperCase({m:"a&a",n:"b&b"}) => ["a&amp;a","b&amp;b"]', function() {
        var result = escape({m: "a&a", n: "b&b"});
        result.should.eql(['a&amp;a', 'b&amp;b']);
      });
    });

    describe('plucker', function() {
      it('util.plucker("input")({input:"aaa",sign:"bbb"}) => "aaa"', function() {
        util.plucker('input')({input: 'aaa', sign: 'bbb'}).should.equal('aaa');
      });
    });

    describe('rePlucker', function() {
      it('util.rePlucker("input")({base:{input:"aaa",sign:"bbb"}, harmony:{input:"ccc",sign:"ddd"}) => ["aaa","ccc"]',
        function() {
          var result = util.rePlucker('input')({
            base: {input: "aaa", sign: "bbb"}, harmony: {input: "ccc", sign: "ddd"}
          });
          result.should.eql(['aaa', 'ccc']);
        });
    });

    describe('pluckAndFind', function() {
      var pitch = music.pitch();
      var pluckAndFind = util.pluckAndFind(pitch, 'input');
      it('input c => {input: "c", sign: "C"}', function() {
        pluckAndFind('c')
          .should.eql({
            input: 'c',
            sign: 'C',
            position: 0
          });
      });
      it('input fs => {input: "fs", sign: "F#"}', function() {
        pluckAndFind('fs')
          .should.eql({
            input: "fs",
            sign: "F#",
            position: 6
          });
      });
      var pluckAndFind2 = util.pluckAndFind(pitch, 'sign');
      it('sign D => {input: "d", sign: "D"}', function() {
        pluckAndFind2('D')
          .should.eql({
            input: 'd',
            sign: 'D',
            position: 2
          });
      });
      it('sign Eb => {input: "ef", sign: "Eb"}', function() {
        pluckAndFind2('Eb')
          .should.eql({
            input: "ef",
            sign: "Eb",
            position: 3
          });
      });
    });

  });

});
