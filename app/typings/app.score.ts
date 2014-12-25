require.config(< RequireConfig > {
  baseUrl: '/scripts'
});

require([
  './data/Ajax',
  './func/ScoreController',
  './viewmodel/Event',
  './util/Util',
  './util/ErrorHandle'
], (Ajax, ScoreController, Event, Util, ErrorHandle) => {

  try {
    Event.initScore();
    // コード譜描画
    Ajax.getScore(Util.splitUrl()[0], Util.splitUrl()[1], Util.splitUrl()[2])
      .then(data => ScoreController.draw(data))
      .fail(err => ErrorHandle.showAppError(err.responseJSON))
  } catch(e) {
    ErrorHandle.send(e);
  } finally {
    $.unblockUI();
  }
});
