(function(location) {
  'use strict';

  require.config({
    baseUrl: '/scripts',
    paths: {
      jquery: '../bower_components/jquery/dist/jquery'
    }
  });

  // view
  require(['helper/side-menu'], function() {});

  // page initialize
  switch (location.pathname) {
    case '/':
    case '/index':
    case '/index.html':
      require(['app/index'], function() {});
      break;
    case '/song':
    case '/song.html':
      require(['app/song'], function() {});
      break;
    case '/songlist':
    case '/songlist.html':
      require(['app/songlist'], function() {});
      break;
    default:
      alert('page initialize error!!');
      //location.href = location.origin + '/404.html';
      break;
  }

})(this.location);
