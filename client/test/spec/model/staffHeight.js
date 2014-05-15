define(function(require) {
  'use strict';

  var StaffHeight = require('../../../app/scripts/model/staffHeight');

  describe('Models', function() {

    describe('Sample Model', function() {
      it('should default "urlRoot" property to "/api/samples"', function() {
        var target = new StaffHeight(10, 11, 12, 13, 'test', true, true);
        console.log(target.height);
      });
    });

  });

});
