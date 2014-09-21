/// <reference path="../../typings/tsd.d.client.ts" />

require.config(<RequireConfig>{baseUrl: '/scripts'});

require([
          './data.ajaxScore',
          './func.draw'
        ], (AjaxScore, func) => {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  AjaxScore.getScoreChordsData(location.pathname, func.draw);
});
