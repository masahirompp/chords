/// <reference path="../../typings/requirejs/require.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />

require.config(<RequireConfig>{baseUrl: '/scripts'});

require([], () => {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  $('.btn').tooltip();
});

