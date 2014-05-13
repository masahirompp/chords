(function() {
  'use strict';

  require.config({
    paths: {
      jquery: '../bower_components/jquery/dist/jquery'
    }
  });

  require(['app', 'jquery', 'helper/side-menu'], function(app, $) {
    // use app here
    console.log('Running jQuery %s', $()
      .jquery);
  });

})();
