require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event',
  './viewmodel/SearchView',
  './util/Url'
], (Event, SearchView, Url) => {
  console.log('list');
  console.log('Running jQuery %s', $()
    .jquery);
  var replaceHistory = true;

  $(() => {
    Event.initSearch();

    // 初回のみ実行
    setTimeout(() => {
      SearchView.$searchKeyword.val(Url.getQueryByName('q'));
      SearchView.$searchBtn.trigger('click', replaceHistory);
    }, 0);
  });
});