/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />

import ScoreController = require('../func/ScoreController');
import Url = require('../util/Url');

class Event {

  static regSpace = /\s+/g;

  static initIndex() {
    $(() => {
      Event.initCommon();
      Event.addEventSearchBtn();

      window.addEventListener('popstate', (e: PopStateEvent) => {
        console.dir(e.state);
      });

    });
  }

  static initSearch() {
    $(() => {
      Event.initCommon();

      $('#searchBtn')
        .on('click', (e) => {
          var keyword = Event.getKeyword();
          if (!keyword) return false;

          e.preventDefault();
          $.Deferred(() => $.blockUI())
            .promise()
            .then(() => {
              return AjaxScore.search(keyword)
            })
            .then((data) => {
              SearchView.drawResult(data);
              history.pushState(data, null, '/search/?q=' + encodeURI(keyword));
            })
            .fail((e) => {
              console.dir(e);
            })
            .always(() => $.unblockUI());
        });

    });
  }

  static initScore() {
    $(() => {
      Event.initCommon();
      Event.addEventSearchBtn();


    });
  }

  private static getKeyword(): string {
    var $searchKeyword = $('#searchKeyword');
    var keyword = $searchKeyword.val()
      .replace(this.regSpace, ' ')
      .trim();
    setTimeout(() => $searchKeyword.val(keyword), 0);
    return keyword;
  }

  private static initCommon() {
    $('.btn')
      .tooltip();
  }

  private static addEventSearchBtn() {
    $('#searchBtn')
      .on('click', (e) => {
        e.preventDefault();
        var keyword = $('#searchKeyword')
          .val();
        if (keyword.match(/\S/)) {
          location.href = '/search' + Url.makeQueryParameter('q', keyword);
        }
      });
  }

}

export = Event;