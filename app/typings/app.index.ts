/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config(<RequireConfig>{baseUrl: '/scripts'});

require(['./viewmodel/Event'], (CommonEvent) => {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  CommonEvent.initCommon();
});

