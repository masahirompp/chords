import KeywordSearchForm = require('../view/KeywordSearchForm');
import KeywordSearchResult = require('../view/KeywordSearchResult');
import Util = require('../Util/Util');

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

    this.notifyKeyword(this.keyword);
  }

  /**
   * 検索結果桜花
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
  }

  static make($keywordSearchForm: JQuery, $keywordSearchResult: JQuery) {
    var keywordSearch = new KeywordSearch();
    var form = new KeywordSearchForm($keywordSearchForm, keywordSearch);
    var result = new KeywordSearchResult($keywordSearchResult, keywordSearch);

    keywordSearch.addObsrvers(form, result);

    keywordSearch.initialize();
    return keywordSearch;
  }

  private addObsrvers(form: KeywordSearchForm, result: KeywordSearchResult) {
    this.addInitialize(form, form.initialize);
    this.addInitialize(result, result.initialize);
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
