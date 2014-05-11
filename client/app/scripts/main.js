(function() {

  require.config({
    paths: {
      jquery: '../bower_components/jquery/dist/jquery'
    },
    shim: {
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    }
  });

  require(['app', 'jquery', 'side-menu'], function(app, $) {
    'use strict';
    // use app here
    console.log('Running jQuery %s', $()
      .jquery);
  });

})();
