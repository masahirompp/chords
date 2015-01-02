import KeywordSearch = require('../viewmodel/KeywordSearch');


class KeywordSearchResult {

  private $results:JQuery;

  constructor($results:JQuery, keywordSearch:KeywordSearch){
    this.$results = $results;

    this.$results.on('click', 'tbody tr', () => {
      keywordSearch.clickDetail(this);
    })
  }

  update(data: any[]){
    // TODO
  }
}

export = KeywordSearchResult
