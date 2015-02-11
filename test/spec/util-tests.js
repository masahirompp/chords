define(function(require) {
  var util = require('util/Util');

  describe('Util', function() {
    describe('complement', function() {
      it('必ずtrueを返す関数のテスト', function() {
        _.constant(true)().should.be.true;
      });
      it('必ずtrueを返す関数の逆の関数は、必ずfalseを返すテスト', function() {
        util.complement(_.constant(true))().should.be.false;
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

  });

});
