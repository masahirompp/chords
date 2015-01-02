/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/KeywordSearch', './util/ErrorHandle'], (KeywordSearch, ErrorHandle) => {
  try {
    KeywordSearch.factory($('#keywordSearchForm'), $('#keywordSearchResult'));
    //Event.initIndex();
  } catch (e) {
    ErrorHandle.send(e);
  } finally {
    $.unblockUI();
  }
});
