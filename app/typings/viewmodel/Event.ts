/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/growl/jquery.growl.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />

import Url = require('../util/Url');
import AjaxScore = require('../data/AjaxScore');
import SearchView = require('./SearchView');

class Event {

  static $container = $('#container');

  static initIndex() {
    Event.addCommonEvent();
    Event.addEventSearchBtn();
  }

  static initSearch() {
    Event.addCommonEvent();
    Event.addEventSearchAjax();
    Event.addEventPopState();
    Event.addEventResult();
  }

  static initScore() {
    Event.addCommonEvent();
    Event.addEventSearchBtn();
  }

  private static addCommonEvent() {
    $('.btn')
      .tooltip();
  }

  private static addEventSearchBtn() {
    SearchView.$searchBtn
      .on('click', (e) => {
        e.preventDefault();
        var keyword = SearchView.getKeyword();
        if (keyword.match(/\S/)) {
          location.href = '/search' + Url.makeQueryParameter('q', keyword);
        }
      });
  }

  private static addEventSearchAjax() {
    SearchView.$searchBtn
      .on('click', (e, replaceHistory) => {
        e.preventDefault();
        var keyword = SearchView.getKeyword();
        if (!keyword) return false;

        $.blockUI({
          message: '<img src="/images/loading.gif" /> '
        });
        AjaxScore.search(keyword)
          .then((data) => {
            SearchView.drawResult(data);
            replaceHistory ? history.replaceState(data, null) : history.pushState(data, null, '/search' + Url.makeQueryParameter('q', keyword));
            SearchView.changeDocumentTitle(keyword);
            if (data.length === 0) SearchView.growlNoResult();
          })
          .fail((e) => {
            console.dir(e);
          })
          .always(() => {
            $.unblockUI();
          });
      });
  }

  private static addEventPopState() {
    window.addEventListener('popstate', (e: PopStateEvent) => {
      var keyword = Url.getQueryByName('q');
      SearchView.$searchKeyword.val(keyword);
      SearchView.changeDocumentTitle(keyword);
      SearchView.drawResult(e.state);
      if (e.state.length === 0) SearchView.growlNoResult();
    });
  }

  private static addEventResult() {
    Event.$container.on('click', 'tr', function() {
      location.href = $(this)
        .attr('uri');
    });
  }


}

export = Event;
