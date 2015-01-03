/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/bootstrap/bootstrap.d.ts" />

import KeywordSearch = require('../viewmodel/KeywordSearch');
import NewScore = require('../viewmodel/NewScore');

class BaseController {

  setupNav() {
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

    KeywordSearch.factory($('#keywordSearchForm'), $('#keywordSearchResult'));
    NewScore.factory($('#newScoreStepChart'), $('#step1'), $('#step2'), $('#step3'), $('#newScoreFooter'));
  }
}

export = BaseController
