import KeywordSearchForm = require('../view/KeywordSearchForm');
import KeywordSearchResult = require('../view/KeywordSearchResult');
import KeywordSearchBrowser = require('../view/KeywordSearchBrowser');
import Message = require('../view/Message');
import Util = require('../Util/Util');
import ErrorHandle = require('../Util/ErrorHandle');

class KeywordSearch {

  private keyword: string = '';
  private results: any[] = [];

  private initializes: Function[] = [];
  private observersKeyword: Function[] = [];
  private observersResults: Function[] = [];

  initialize() {
    this.keyword = '';
    this.results = [];
    this.initializes.forEach(func => setTimeout(func, 0));
  }

  /**
   * 検索ボタン押下
   * @param keyword
   */
  submit(keyword: string) {
    this.keyword = Util.trim(keyword);

    // TODO 検索処理実行

    this.notifyKeyword(this.keyword);
  }

  /**
   * PopStateイベントの処理
   * @param state
   */
  popState(state: any) {
    if (!state) return;
    this.keyword = state.keyword;
    this.results = state.results;

    this.notifyKeyword(this.keyword);
    this.notifyResults(this.results);
  }

  /**
   * PushState
   * @param keyword
   * @param results
   */
  pushState(keyword, results) {
    history.pushState({
      keyword: keyword,
      results: results
    }, null, '/search' + Util.makeQueryParameter('q', keyword))
  }

  /**
   * 検索結果押下
   * @param data
   */
  clickDetail(data: any) {
    // TODO
  }

  /**
   * 検索結果バインド
   * @param results
   */
  bindResults(results: any[]) {
    this.results = results;

    this.notifyResults(this.results);
    if (this.results.length === 0) {
      Message.showWarning('「<strong>' + this.keyword + '</strong>」の検索結果はありませんでした。');
    }

    this.pushState(this.keyword, this.results);
  }

  static make($keywordSearchForm: JQuery, $keywordSearchResult: JQuery) {
    var keywordSearch = new KeywordSearch();
    var form = new KeywordSearchForm($keywordSearchForm, keywordSearch);
    var result = new KeywordSearchResult($keywordSearchResult, keywordSearch);
    var browser = new KeywordSearchBrowser(keywordSearch);

    keywordSearch.addObsrvers(form, result, browser);

    keywordSearch.initialize();
    return keywordSearch;
  }

  private addObsrvers(form: KeywordSearchForm, result: KeywordSearchResult, browser: KeywordSearchBrowser) {
    this.addInitialize(form, form.initialize);
    this.addInitialize(result, result.initialize);
    this.addObserverKeyword(form, form.setKeyword);
    this.addObserverKeyword(browser, browser.setTitle);
    this.addObserverResults(result, result.update);
  }

  private addInitialize(receiver: any, func: () => void) {
    this.initializes.push(func.bind(receiver));
  }

  private addObserverKeyword(receiver: any, func: (keyword: string) => void) {
    this.observersKeyword.push(func.bind(receiver));
  }

  private addObserverResults(receiver: any, func: (result: any[]) => void) {
    this.observersResults.push(func.bind(receiver));
  }

  private notifyKeyword(keyword: string) {
    this.observersKeyword.forEach(func => setTimeout(() => func(keyword), 0));
  }

  private notifyResults(results: any) {
    this.observersResults.forEach(func => setTimeout(() => func(results), 0));
  }
}

export = KeywordSearch
