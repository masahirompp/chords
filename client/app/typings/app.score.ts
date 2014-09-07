/// <reference path="../../typings/tsd.d.ts" />

require.config({baseUrl: 'scripts'});

require(['./func.draw'], function(draw:()=> void) {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  draw();
});

