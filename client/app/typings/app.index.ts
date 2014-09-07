/// <reference path="../../typings/tsd.d.ts" />

require.config({baseUrl: 'scripts'});

require([], function() {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
});

