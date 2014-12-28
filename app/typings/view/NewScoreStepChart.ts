import NewScore = require('../viewmodel/NewScore')

class NewScoreStepChart {

  private $step1: JQuery;
  private $step2: JQuery;
  private $step3: JQuery;

  constructor($stepChart: JQuery, newScore: NewScore) {
    this.$step1 = $stepChart.find('li:first');
    this.$step2 = $stepChart.find('li:nth-child(2)');
    this.$step3 = $stepChart.find('li:nth-child(3)');

    this.$step1.on('click', () => newScore.clickStep(1));
    this.$step2.on('click', () => newScore.clickStep(2));
    this.$step3.on('click', () => newScore.clickStep(3));
  }

  activeStep1() {
    NewScoreStepChart.toActive(this.$step1);
    NewScoreStepChart.toDisable(this.$step2);
    NewScoreStepChart.toDisable(this.$step3);
  }

  activeStep2() {
    NewScoreStepChart.toNormal(this.$step1);
    NewScoreStepChart.toActive(this.$step2);
    NewScoreStepChart.toDisable(this.$step3);
  }

  activeStep3() {
    NewScoreStepChart.toNormal(this.$step1);
    NewScoreStepChart.toNormal(this.$step2);
    NewScoreStepChart.toActive(this.$step3);
  }

  private static toActive($step) {
    $step.removeClass('disabled')
      .addClass('active');
  }

  private static toDisable($step) {
    $step.removeClass('active')
      .addClass('disabled');
  }

  private static toNormal($step) {
    $step.removeClass('active')
      .removeClass('disabled');
  }

}

export = NewScoreStepChart