class NewScoreBody {

  constructor(public $step1, public $step2, public $step3) {}

  initalize() {
    this.$step2.hide();
    this.$step3.hide();
    this.$step1.show();
  }

  change(prevStep: number, nextStep: number) {
    this.get$step(prevStep).hide('fast');
    this.get$step(nextStep).show('fast');
  }

  private get$step(stepNumber: number) {
    switch (stepNumber) {
      case 2:
        return this.$step2;
      case 3:
        return this.$step3;
      default:
        return this.$step1;
    }
  }

}

export = NewScoreBody
