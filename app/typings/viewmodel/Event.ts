/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../tsd/ext/ext.d.ts" />

import Ajax = require('../data/Ajax');
import SearchView = require('./SearchView');
import Util = require('../util/Util');
import ErrorHandle = require('../util/ErrorHandle');
import Message = require('./Message');
import NewScore = require('../viewmodel/NewScore');

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

  static initMypage() {
    Event.addCommonEvent();
  }

  private static addCommonEvent() {
    $('.btn')
      .tooltip();
    $('.block-ui-logout')
      .on('click', () => {
        $.blockUI({
          baseZ: 2000,
          message: '<div class="text-muted">ログアウトしています。</div>'
        });
      });
    $('.block-ui-twitter')
      .on('click', () => {
        $.blockUI({
          baseZ: 2000,
          message: '<div class="text-muted">twitterに接続しています。</div>'
        });
      });

    var newScore = NewScore.make($('#newScoreStepChart'), $('#step1'), $('#step2'));
  }

  private static addEventSearchBtn() {
    SearchView.$searchBtn
      .on('click', (e) => {
        try {
          e.preventDefault();
          var keyword = SearchView.getKeyword();
          if (keyword.match(/\S/)) {
            location.href = '/search' + Util.makeQueryParameter('q', keyword);
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
          Message.remove();

          var keyword = SearchView.getKeyword();
          if (!keyword) return false;

          if (!redirect) $.blockUIl();
          Ajax.searchScores(keyword)
            .then((data) => {
              SearchView.drawResult(data);
              redirect ? history.replaceState(data, null) : history.pushState(data, null, '/search' + Util.makeQueryParameter('q', keyword));
              SearchView.changeDocumentTitle(keyword);
              if (data.length === 0) Event.showNoResult(keyword);
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
        var keyword = Util.getQueryByName('q');
        SearchView.$searchKeyword.val(keyword);
        SearchView.changeDocumentTitle(keyword);
        SearchView.drawResult(e.state);
        $.unblockUI();
        if (e.state.length === 0) Event.showNoResult(keyword);
      } catch (e) {
        ErrorHandle.send(e);
        $.unblockUI();
      }
    });
  }

  private static addEventResult() {
    Event.$container.on('click', 'tbody tr', function() {
      try {
        location.href = $(this)
          .attr('uri');
      } catch (e) {
        ErrorHandle.send(e);
      }
    });
  }

  private static showNoResult(keyword): void {
    Message.showWarning('「<strong>' + keyword + '</strong>」の検索結果はありませんでした。');
  }

}

export = Event;
