/// <reference path="../../typings/tsd.d.ts" />

require.config({baseUrl: 'scripts'});

require(['./endpoint', './func.draw'], function(endpoint:Endpoint, draw:()=> void) {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  draw();
});

