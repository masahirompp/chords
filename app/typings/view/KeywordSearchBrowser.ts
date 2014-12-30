import KeywordSearch = require('../viewmodel/KeywordSearch');

class KeywordSearchBrowser {

  constructor(keywordSearch: KeywordSearch) {
    window.addEventListener('popstate', (e: PopStateEvent) => {
      keywordSearch.popState(e.state);
    });
  }

  setTitle(keyword: string) {
    document.title = keyword + 'の検索結果 | コード譜共有サイト ChordKichen';
  }
}

export = KeywordSearchBrowser
