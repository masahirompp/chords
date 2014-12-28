import NewScore = require('../viewmodel/NewScore')

class NewScoreFooter {

  private $submitBtn: JQuery;
  private $resetBtn: JQuery;

  constructor($footer: JQuery, newScore: NewScore) {
    this.$submitBtn = $footer.find('#createNewScore');
    this.$resetBtn = $footer.find('#resetNewScore');

    this.$resetBtn.on('click', (e) => {
      e.preventDefault();
      newScore.initialize()
    })
  }

  initialize(){
    this.showSubmitBtn(false);
  }

  showSubmitBtn(state: boolean) {
    state ? this.$submitBtn.show() : this.$submitBtn.hide();
  }

}

export = NewScoreFooter
