require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event'], (CommonEvent) => {
  console.log('list');
  console.log('Running jQuery %s', $()
    .jquery);
  CommonEvent.initSearch();
});