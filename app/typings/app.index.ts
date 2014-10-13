/// <reference path="../../typings/requirejs/require.d.ts" />

require.config(<RequireConfig>{baseUrl: '/scripts'});

require(['./viewmodel/CommonEvent'], (CommonEvent) => {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  CommonEvent.init();
});

