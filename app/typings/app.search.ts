"use strict";

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/KeywordSearch',
  './util/ErrorHandle'
], (KeywordSearch, ErrorHandle) => {
  try {
    KeywordSearch.factory($('#keywordSearchForm'), $('#keywordSearchResult'));
  } catch (e) {
    ErrorHandle.send(e);
  } finally {
    $.unblockUI();
  }
});
