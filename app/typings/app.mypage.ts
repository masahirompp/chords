/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event', './viewmodel/SearchView', './data/AjaxScore', './util/ErrorHandle'], (Event, SearchView, AjaxScore, ErrorHandle) => {

  $(() => {
    try {
      Event.initMypage();

      AjaxScore.searchByAuthor('masahirompp')
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
