(function() {
  'use strict';
  console.log('songlist');

  require.config({
    paths: {
      jquery: '../bower_components/jquery/dist/jquery'
    }
  });

  // view
  require(['helper/side-menu'], function() {});

  // logic
  require(['jquery'], function($) {
    // use app here
    console.log('Running jQuery %s', $()
      .jquery);
  });

})();
