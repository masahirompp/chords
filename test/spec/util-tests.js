define(function(require) {
  var util = require('util/Util');

  describe('Util', function() {
    describe('Util1', function() {
      it('should default "urlRoot" property to "/api/samples"', function() {
        util.existy(null)
          .should.equal(false);
      });
    });

  });

});
