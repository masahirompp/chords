require.config(<RequireConfig>{baseUrl: '/scripts'});

require([
          './data/AjaxScore',
          './func/draw'
        ], (AjaxScore, func) => {
  console.log('index');
  console.log('Running jQuery %s', $().jquery);
  AjaxScore.getScoreChordsData(location.pathname, func.draw);
});
