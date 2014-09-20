/// <reference path="../../typings/tsd.d.ts" />

require.config(<RequireConfig>{baseUrl: 'scripts'});

require([], function() {
  console.log('list');
  console.log('Running jQuery %s', $().jquery);
});

