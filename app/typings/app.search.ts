require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event',
  './viewmodel/SearchView',
  './util/Util',
  './util/ErrorHandle'
], (Event, SearchView, Url, ErrorHandle) => {

  var redirect = true;

  $(() => {
    try {
      Event.initSearch();

      // 初回のみ実行
      SearchView.$searchKeyword.val(Url.getQueryByName('q'));
      SearchView.$searchBtn.trigger('click', redirect);

    } catch (e) {
      ErrorHandle.send(e);
      $.unblockUI();
    }

  });
});
