import KeywordSearch = require('../viewmodel/KeywordSearch');

class KeywordSearchForm {

  private $input: JQuery;
  private $btn : JQuery;

  constructor($form : JQuery, keywordSearch:KeywordSearch){
    this.$input = $form.find('#searchKeyword');
    this.$btn = $form.find('#searchBtn');

    this.$btn.on('click', () => {
      keywordSearch.submit(this.$input.val());
    });
  }

  initialize(){
    this.$input.val('');
  }
}

export = KeywordSearchForm
