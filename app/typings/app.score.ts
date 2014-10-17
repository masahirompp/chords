require.config(<RequireConfig>{baseUrl: '/scripts'});

require([
          './data/AjaxScore',
          './func/ScoreController'
        ], (AjaxScore, ScoreController) => {
  console.log('score');
  console.log('Running jQuery %s', $().jquery);
  AjaxScore.getScore()
    .then((data) => ScoreController.draw(data));
});
