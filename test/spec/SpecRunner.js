require.config({
  baseUrl: '/scripts/',
  paths: {
    //'mocha': '/bower_components/mocha/mocha',
    'chai': '/bower_components/chai/chai',
    'util-tests': '/spec/util-tests',
    'music-tests': '/spec/music-tests'
  }
});

define(function(require) {
  'use strict';
  var chai = require('chai');
  var should = chai.should();
  mocha.setup('bdd');

  require([
    'util-tests', 'music-tests'
  ], function(require) {
    mocha.run();
  });

});
