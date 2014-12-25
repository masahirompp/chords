/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event', './viewmodel/SearchView', './data/Ajax', './util/ErrorHandle'], (Event, SearchView, Ajax, ErrorHandle) => {

  try {
    Event.initMypage();
    Ajax.getMyScores()
      .then((data) => {
        SearchView.drawResult(data);
      })
      .fail((e) => {
        ErrorHandle.send(e);
      })
  } catch (e) {
    ErrorHandle.send(e);
  } finally {
    $.unblockUI();
  }

});
