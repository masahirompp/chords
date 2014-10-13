/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />

import ScoreController = require('../func/ScoreController');

class CommonEvent {

  static init() {
    $(()=> {

      $('.btn').tooltip();

      $('#searchBtn').on('click', (e) => {
        var keyword = $('#searchKeyword').val();
        ScoreController.search(keyword);
        e.preventDefault();
      });

    });

  }

}

export = CommonEvent;
