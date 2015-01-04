import NewScore = require('../viewmodel/NewScore')

class NewScoreFooter {

  private $submitBtn: JQuery;
  private $resetBtn: JQuery;
  private $nextStep2Btn: JQuery;
  private $nextStep3Btn: JQuery;

  constructor($footer: JQuery, newScore: NewScore) {
    this.$submitBtn = $footer.find('#newScoreCreate');
    this.$resetBtn = $footer.find('#newScoreReset');
    this.$nextStep2Btn = $footer.find('#newScoreNextStep2');
    this.$nextStep3Btn = $footer.find('#newScoreNextStep3');

    this.$resetBtn.on('click', e => {
      e.preventDefault();
      newScore.initialize()
    });
    this.$nextStep2Btn.on('click', e => {
      e.preventDefault();
      newScore.clickStepChart2();
    });
    this.$nextStep3Btn.on('click', e => {
      e.preventDefault();
      newScore.step2to3();
    });
  }

  initialize() {
    this.showSubmitBtn(false);
    this.showNextStep2Btn(false);
    this.showNextStep3Btn(false);
  }

  showNextStepBtn(prevStep: number, nextStep: number) {
    if (prevStep === 1)
      this.$nextStep2Btn.hide();
    if (prevStep === 2)
      this.$nextStep3Btn.hide();
  }

  showNextStep2Btn(state: boolean) {
    state ? this.$nextStep2Btn.show() : this.$nextStep2Btn.hide();
  }

  showNextStep3Btn(state: boolean) {
    state ? this.$nextStep3Btn.show() : this.$nextStep3Btn.hide();
  }

  showSubmitBtn(state: boolean) {
    state ? this.$submitBtn.show() : this.$submitBtn.hide();
  }
}

export = NewScoreFooter
