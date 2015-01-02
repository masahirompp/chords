import KeywordSearch = require('../viewmodel/KeywordSearch');
import ViewHelper = require('./ViewHelper');
import ScoreDTO = require('../dto/ScoreDTO');

class KeywordSearchBrowser {

  constructor(public keywordSearch: KeywordSearch) {
    /**
     * PopState
     */
    window.addEventListener('popstate', (e: PopStateEvent) => {
      var data = ViewHelper.getQueryParams();
      keywordSearch.popState(data.q, e.state);
    });
  }

  /**
   * PushState
   * @param keyword
   * @param results
   */
  pushState(keyword: string, results: ScoreDTO[]) {
    if (ViewHelper.getQueryParams().q === keyword) {
      // キーワードが変わっていないなら、データだけ書き換える。
      history.replaceState(results, null);
      return;
    }
    history.pushState(results, null, '/search?' + $.param({
      q: keyword
    }));
  }

  /**
   * クエリパラメータから検索
   */
  searchFromQueryParams() {
    var data = ViewHelper.getQueryParams();
    this.keywordSearch.submit(data.q);
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
  transition(keyword: string) {
    window.location.href = '/search?' + $.param({
      q: keyword
    });
  }
}

export = KeywordSearchBrowser
