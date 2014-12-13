require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require([
  './data/Ajax',
  './func/ScoreController',
  './viewmodel/Event',
  './util/ErrorHandle'
], (AjaxScore, ScoreController, Event, ErrorHandle) => {

  $(() => {
    try {
      Event.initScore();

      // コード譜描画
      AjaxScore.getScore()
        .then(data => ScoreController.draw(data))
        .fail(err => ErrorHandle.showAppError(err.responseJSON))
        .always(() => $.unblockUI());

    } catch (e) {
      ErrorHandle.send(e);
      $.unblockUI();
    }
  });
});
