import KeywordSearch = require('../viewmodel/KeywordSearch');
import ViewHelper = require('./ViewHelper');

class KeywordSearchBrowser {

  constructor(keywordSearch: KeywordSearch) {
    /**
     * PopState
     */
    window.addEventListener('popstate', (e: PopStateEvent) => {
      var data = ViewHelper.getQueryParams();
      data['results'] = e.state;
      keywordSearch.popState(data);
    });
  }

  /**
   * PushState
   * @param keyword
   * @param results
   */
  pushState(keyword: string, results: any[]) {
    history.pushState(results, null, '/search?' + $.param({
      q: keyword
    }));
  }

  /**
   * title設定
   * @param keyword
   */
  setTitle(keyword: string) {
    document.title = keyword + 'の検索結果 | コード譜共有サイト ChordKichen';
  }

  /**
   * 画面遷移
   * @param keyword
   */
  transition(keyword: string){
    window.location.href = '/search?' + $.param({
      q: keyword
    });
  }
}

export = KeywordSearchBrowser
