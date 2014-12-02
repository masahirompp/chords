/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event', './viewmodel/SearchView', './data/AjaxScoreAuth', './util/ErrorHandle'], (Event, SearchView, AjaxScoreAuth, ErrorHandle) => {

  $(() => {
    try {
      Event.initMypage();

      AjaxScoreAuth.getMySocres()
        .then((data) => {
          SearchView.drawResult(data);
        })
        .fail((e) => {
          ErrorHandle.send(e);
        })
        .always(() => {
          $.unblockUI();
        });

      $.unblockUI();
    } catch (e) {
      ErrorHandle.send(e);
      $.unblockUI();
    }
  });
});