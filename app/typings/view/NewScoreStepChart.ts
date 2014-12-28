import NewScore = require('../viewmodel/NewScore')

class NewScoreStepChart {

  private $step1: JQuery;
  private $step2: JQuery;
  private $step3: JQuery;

  constructor($stepChart: JQuery, newScore: NewScore) {
    this.$step1 = $stepChart.find('li:first');
    this.$step2 = $stepChart.find('li:nth-child(2)');
    this.$step3 = $stepChart.find('li:nth-child(3)');

    this.$step1.on('click', (e) => {
      e.preventDefault();
      newScore.clickStep(1);
    });
    this.$step2.on('click', (e) => {
      e.preventDefault();
      newScore.clickStep(2);
    });
    this.$step3.on('click', (e) => {
      e.preventDefault();
      newScore.clickStep(3);
    });
  }

  initialize() {
    this.updateStep2(false);
    this.updateStep3(false);
    this.$step1.addClass('active');
    this.$step2.removeClass('active');
    this.$step3.removeClass('active');
  }

  /**
   *
   * @param prevStep
   * @param nextStep
   */
  updateActive(prevStep: number, nextStep: number) {
    this.get$step(prevStep)
      .removeClass('active');
    this.get$step(nextStep)
      .addClass('active');
  }

  updateStep2(isStep1OK: boolean) {
    isStep1OK ? this.$step2.removeClass('disabled') : this.$step2.addClass('disabled');
  }

  updateStep3(isStep2OK: boolean) {
    isStep2OK ? this.$step3.removeClass('disabled') : this.$step3.addClass('disabled');
  }

  private get$step(step: number): JQuery {
    switch (step) {
      case 1:
        return this.$step1;
      case 2:
        return this.$step2;
      case 3:
        return this.$step3;
    }
  }
}

export = NewScoreStepChart