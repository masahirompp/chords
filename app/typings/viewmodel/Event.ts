/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />

import ScoreController = require('../func/ScoreController');
import Url = require('../util/Url');

class Event {

  static initIndex() {
    $(()=> {
      Event.initCommon();
      Event.addEventSearchBtn();

      window.addEventListener('popstate', (e:PopStateEvent) => {
        console.dir(e.state);
      });

    });
  }

  static initSearch() {
    $(()=> {
      Event.initCommon();

      $('#searchBtn').on('click', (e) => {
        e.preventDefault();
        var keyword = $('#searchKeyword').val();
        ScoreController.search(keyword);
      });

    });
  }

  static initScore() {
    $(()=> {
      Event.initCommon();
      Event.addEventSearchBtn();


    });
  }

  private static initCommon() {
    $('.btn').tooltip();
  }

  private static addEventSearchBtn() {
    $('#searchBtn').on('click', (e) => {
      e.preventDefault();
      var keyword = $('#searchKeyword').val();
      if(keyword.match(/\S/)) {
        location.href = '/search' + Url.makeQueryParameter('q', keyword);
      }
    });
  }

}

export = Event;
