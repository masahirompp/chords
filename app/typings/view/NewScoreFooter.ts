import NewScore = require('../viewmodel/NewScore')

class NewScoreFooter {

  private $submitBtn: JQuery;
  private $resetBtn: JQuery;

  constructor($footer: JQuery, newScore: NewScore) {
    this.$submitBtn = $footer.find('#createNewScore');
    this.$resetBtn = $footer.find('#resetNewScore');
    this.$resetBtn.on('click', () => newScore.initialize())
  }

  initialize() {
    this.hideSubmitBtn();
  }

  showSubmitBtn() {
    this.$submitBtn.show();
  }

  hideSubmitBtn() {
    this.$submitBtn.hide();
  }


}

export = NewScoreFooter
