import ViewHelper = require('ViewHelper')
import KeywordSearch = require('../viewmodel/KeywordSearch');

class KeywordSearchForm {

  private $input: JQuery;
  private $btn: JQuery;

  constructor($form: JQuery, keywordSearch: KeywordSearch) {
    this.$input = $form.find('#searchKeyword');
    this.$btn = $form.find('#searchBtn');

    this.$btn.on('click', () => {
      keywordSearch.submit(ViewHelper.trim(this.$input.val()));
      return false;
    });
  }

  setKeyword(keyword: string) {
    this.$input.val(keyword);
  }
}

export = KeywordSearchForm
