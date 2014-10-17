/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />

import ScoreController = require('../func/ScoreController');

class CommonEvent {

  static init() {
    $(()=> {

      window.addEventListener('popstate', (e:PopStateEvent) => {
        console.dir(e.state);
      });

      $('.btn').tooltip();

      $('#searchBtn').on('click', (e) => {
        e.preventDefault();
        var keyword = $('#searchKeyword').val();
        ScoreController.search(keyword);
      });

    });

  }

}

export = CommonEvent;
