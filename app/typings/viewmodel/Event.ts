/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/growl/jquery.growl.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />

import Url = require('../util/Url');
import AjaxScore = require('../data/AjaxScore');
import SearchView = require('./SearchView');

class Event {

  static $container = $('#container');

  static regSpace = /\s+/g;

  static initIndex() {
    Event.initCommon();
    Event.addEventSearchBtn();
  }

  static initSearch() {
    Event.initCommon();
    Event.addEventSearchAjax();
    Event.addEventPopState();
    Event.addEventResult();
  }

  static initScore() {
    Event.initCommon();
    Event.addEventSearchBtn();
  }

  private static getKeyword(): string {
    var keyword = SearchView.$searchKeyword.val()
      .replace(this.regSpace, ' ')
      .trim();
    setTimeout(() => SearchView.$searchKeyword.val(keyword), 0);
    return keyword;
  }

  private static initCommon() {
    $('.btn')
      .tooltip();
  }

  private static addEventSearchBtn() {
    SearchView.$searchBtn
      .on('click', (e) => {
        e.preventDefault();
        var keyword = Event.getKeyword();
        if (keyword.match(/\S/)) {
          location.href = '/search' + Url.makeQueryParameter('q', keyword);
        }
      });
  }

  private static addEventSearchAjax() {
    SearchView.$searchBtn
      .on('click', (e, replaceHistory ? ) => {
        e.preventDefault();
        var keyword = Event.getKeyword();
        if (!keyword) return false;

        $.blockUI({
          message: '<img src="/images/loading.gif" /> '
        });
        AjaxScore.search(keyword)
          .then((data) => {
            SearchView.drawResult(data);
            replaceHistory ? history.replaceState(data, null) : history.pushState(data, null, '/search' + Url.makeQueryParameter('q', keyword));
            if (data.length === 0) Event.growlNoResult();
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
      SearchView.$searchKeyword.val(Url.getQueryByName('q'));
      SearchView.drawResult(e.state);
      if (e.state.length === 0) Event.growlNoResult();
    });
  }

  private static growlNoResult() {
    $.growl.notice({
      title: '検索結果0件',
      message: '曲名、アーティスト名を変えて検索してください。',
      location: 'underHeader',
      duration: 700
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