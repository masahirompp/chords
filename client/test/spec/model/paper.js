define(function(require) {
  'use strict';

  var Paper = require('../../../app/scripts/model/paper');

  describe('Models', function() {

    describe('Sample Model', function() {
      it('should default "urlRoot" property to "/api/samples"', function() {
        var target = new Paper(10, 11, 12, 13);
        console.log(target.margin);
      });
    });

  });

});
