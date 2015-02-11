require.config({
  baseUrl: '/scripts/',
  paths: {
    //'mocha': '/bower_components/mocha/mocha',
    'chai': '/bower_components/chai/chai',
    'util-tests': '/spec/util-tests'
  }
});

define(function(require) {
  //var mocha = require('mocha');
  var chai = require('chai');
  var should = chai.should();
  mocha.setup('bdd');

  require([
    'util-tests'
  ], function(require) {
    mocha.run();
  });

});
