import KeywordSearchForm = require('../view/KeywordSearchForm');
import KeywordSearchResult = require('../view/KeywordSearchResult');
import KeywordSearchBrowser = require('../view/KeywordSearchBrowser');
import Ajax = require('../data/Ajax');
import ScoreDTO = require('../dto/ScoreDTO');

class KeywordSearch {

  private keyword: string = '';
  private results: any[] = [];
  private isSearchDisplay: boolean; // 検索画面表示中か？

  private initializes: Function[] = [];
  private observersKeyword: Function[] = [];
  private observersResults: Function[] = [];
  private observersKeywordResults: Function[] = [];

  /**
   * コンストラクタ
   * @param isSearchDisplay 検索画面か？
   */
  constructor(isSearchDisplay: boolean) {
    this.isSearchDisplay = isSearchDisplay;
  }

  /**
   * 初期化
   */
  initialize() {
    this.initializes.forEach(func => setTimeout(func, 0));
  }

  /**
   * 検索ボタン押下
   * @param keyword
   */
  submit(keyword: string) {
    this.keyword = keyword;
    this.notifyKeyword(this.keyword);

    if (this.isSearchDisplay) {
      Ajax.searchScores(this.keyword)
        .then(scores => this.bindResults(scores));
    }
  }

  /**
   * 検索結果バインド
   * @param results
   */
  bindResults(results: ScoreDTO[]) {
    this.results = results;
    this.notifyResults(this.results);
    this.notifyKeywordResults(this.keyword, this.results);
  }

  /**
   * PopState
   * @param keyword
   * @param results
   */
  popState(keyword: string, results: ScoreDTO[]) {
    this.keyword = keyword;
    this.results = results;
    this.notifyKeyword(this.keyword);
    this.notifyResults(this.results);
  }

  /**
   * さらに読み込む
   */
  more() {

  }

  /**
   * factory method.
   * @param $keywordSearchForm
   * @param $keywordSearchResult
   * @returns {KeywordSearch}
   */
  static factory($keywordSearchForm: JQuery, $keywordSearchResult: JQuery) {
    var keywordSearch = new KeywordSearch($keywordSearchResult.length === 1);
    var form = new KeywordSearchForm($keywordSearchForm, keywordSearch);
    var browser = new KeywordSearchBrowser(keywordSearch);
    var result = new KeywordSearchResult($keywordSearchResult, keywordSearch);
    keywordSearch.addObservers(form, result, browser);
    keywordSearch.initialize();

    return keywordSearch;
  }

  /**
   * オブザーバ設定
   * @param form 検索フォーム
   * @param result 検索結果
   * @param browser ブラウザ検索
   */
  private addObservers(form: KeywordSearchForm, result: KeywordSearchResult, browser: KeywordSearchBrowser) {
    if (!this.isSearchDisplay) {
      this.addObserverKeyword(browser, browser.transition);
      return;
    }
    this.addInitialize(browser, browser.searchFromQueryParams);
    this.addObserverKeyword(form, form.setKeyword);
    this.addObserverKeyword(browser, browser.setTitle);
    this.addObserverResults(result, result.update);
    this.addObserverResults(result, result.showMessage);
    this.addObserverKeywordResults(browser, browser.pushState);
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

  private addObserverKeywordResults(receiver: any, func: (keyword: string, results: any[]) => void) {
    this.observersKeywordResults.push(func.bind(receiver));
  }

  private notifyKeyword(keyword: string) {
    this.observersKeyword.forEach(func => setTimeout(() => func(keyword), 0));
  }

  private notifyResults(results: any) {
    this.observersResults.forEach(func => setTimeout(() => func(results), 0));
  }

  private notifyKeywordResults(keyword: string, results: any[]) {
    this.observersKeywordResults.forEach(func => setTimeout(() => func(keyword, results), 0));
  }
}

export = KeywordSearch
