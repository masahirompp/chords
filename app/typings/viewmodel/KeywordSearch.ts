import KeywordSearchForm = require('../view/KeywordSearchForm');
import KeywordSearchResult = require('../view/KeywordSearchResult');
import KeywordSearchBrowser = require('../view/KeywordSearchBrowser');
import Ajax = require('../data/Ajax');
import Message = require('../view/Message');
import Util = require('../util/Util');
import ErrorHandle = require('../util/ErrorHandle');

class KeywordSearch {

  private keyword: string = '';
  private results: any[] = [];
  private isSearchDisplay: boolean; // 検索画面表示中か？

  private initializes: Function[] = [];
  private observersKeyword: Function[] = [];
  private observersResults: Function[] = [];
  private observersKeywordResults: Function[] = [];

  constructor(isSearchDisplay: boolean) {
    this.isSearchDisplay = isSearchDisplay;
  }

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

    if (this.isSearchDisplay) {
      Ajax.searchScores(this.keyword)
        .then(scores => this.bindResults(scores));
    }

    this.notifyKeyword(this.keyword);
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
    this.notifyKeywordResults(this.keyword, this.results);
  }

  popState(data: any) {
    this.keyword = data.keyword;
    this.results = data.results;
  }

  static factory($keywordSearchForm: JQuery, $keywordSearchResult ? : JQuery) {
    var keywordSearch = new KeywordSearch($keywordSearchResult.length === 1);
    var form = new KeywordSearchForm($keywordSearchForm, keywordSearch);
    var browser = new KeywordSearchBrowser(keywordSearch);
    var result = new KeywordSearchResult($keywordSearchResult, keywordSearch);
    keywordSearch.addObsrvers(form, result, browser);
    keywordSearch.initialize();

    return keywordSearch;
  }

  private addObsrvers(form: KeywordSearchForm, result: KeywordSearchResult, browser: KeywordSearchBrowser) {
    if (!this.isSearchDisplay) {
      this.addObserverKeyword(browser, browser.transition);
      return;
    }
    this.addInitialize(result, result.initialize);
    this.addObserverKeyword(form, form.setKeyword);
    this.addObserverKeyword(browser, browser.setTitle);
    this.addObserverResults(result, result.update);
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