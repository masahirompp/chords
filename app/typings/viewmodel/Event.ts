/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/growl/jquery.growl.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../tsd/ext/ext.d.ts" />

import AjaxScore = require('../data/AjaxScore');
import SearchView = require('./SearchView');
import Url = require('../util/Url');
import ErrorHandle = require('../util/ErrorHandle');

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
        try {
          e.preventDefault();
          var keyword = SearchView.getKeyword();
          if (keyword.match(/\S/)) {
            location.href = '/search' + Url.makeQueryParameter('q', keyword);
          }
        } catch (e) {
          ErrorHandle.send(e);
        }
      });
  }

  private static addEventSearchAjax() {
    SearchView.$searchBtn
      .on('click', (e, redirect) => {
        try {
          e.preventDefault();
          var keyword = SearchView.getKeyword();
          if (!keyword) return false;

          if (!redirect) $.blockUIl();
          AjaxScore.search(keyword)
            .then((data) => {
              SearchView.drawResult(data);
              redirect ? history.replaceState(data, null) : history.pushState(data, null, '/search' + Url.makeQueryParameter('q', keyword));
              SearchView.changeDocumentTitle(keyword);
              if (data.length === 0) SearchView.growlNoResult();
            })
            .fail((e) => {
              console.dir(e);
            })
            .always(() => {
              $.unblockUI();
            });
        } catch (e) {
          ErrorHandle.send(e);
          $.unblockUI();
        }
      });
  }

  private static addEventPopState() {
    window.addEventListener('popstate', (e: PopStateEvent) => {
      try {
        $.blockUIl();
        var keyword = Url.getQueryByName('q');
        SearchView.$searchKeyword.val(keyword);
        SearchView.changeDocumentTitle(keyword);
        SearchView.drawResult(e.state);
        $.unblockUI();
        if (e.state.length === 0) SearchView.growlNoResult();
      } catch (e) {
        ErrorHandle.send(e);
        $.unblockUI();
      }
    });
  }

  private static addEventResult() {
    Event.$container.on('click', 'tr', function() {
      try {
        location.href = $(this)
          .attr('uri');
      } catch (e) {
        ErrorHandle.send(e);
      }
    });
  }


}

export = Event;
