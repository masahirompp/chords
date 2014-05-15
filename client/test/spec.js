require.config({
  baseUrl: '../app/scripts',
  paths: {
    'require': '../../test/bower_components/requirejs/require',
    'mocha': '../../test/bower_components/mocha/mocha',
    'chai': '../../test/bower_components/chai/chai'
  }
});

require(['require', 'chai', 'mocha'], function(require, chai) {

  // Chai
  var should = chai.should();

  /* globals mocha */
  mocha.setup('bdd');

  require([
    /* add spec sources */
    '../../test/spec/model/staffHeight',
    '../../test/spec/model/paper'
  ], function(require) {
    mocha.run();
  });

});
