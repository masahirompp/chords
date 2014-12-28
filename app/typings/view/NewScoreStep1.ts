import NewScore = require('../viewmodel/NewScore')

class NewScoreStep1 {

  private $originalBtn: JQuery;
  private $existingBtn: JQuery;

  constructor($step1: JQuery, newScore: NewScore) {
    this.$originalBtn = $step1.find('#original');
    this.$existingBtn = $step1.find('#existing');

    this.$originalBtn.click(() => newScore.step1to2(true));
    this.$existingBtn.click(() => newScore.step1to2(false));
  }

  initialize() {
    this.$originalBtn.removeClass('active');
    this.$existingBtn.removeClass('active');
  }

  activeBtn(isOriginal: boolean) {
    isOriginal ? this.activeOriginalBtn() : this.activeExistingBtn();
  }

  /**
   * オリジナルボタン
   */
  private activeOriginalBtn() {
    this.$originalBtn.addClass('active');
    this.$existingBtn.removeClass('active');
  }

  /**
   * 既存曲ボタン
   */
  private activeExistingBtn() {
    this.$originalBtn.removeClass('active');
    this.$existingBtn.addClass('active');
  }
}

export = NewScoreStep1
