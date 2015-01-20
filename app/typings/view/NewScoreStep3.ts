import NewScore = require('../viewmodel/NewScore')

class NewScoreStep3 {

  private $newScoreKey: JQuery;
  private $description: JQuery;
  private $musicalTime: JQuery;

  constructor($step3: JQuery, newScore: NewScore) {
    this.$newScoreKey = $step3.find('#newScoreKey');
    this.$description = $step3.find('#newScoreDescription');
    this.$musicalTime = $step3.find('#newScoreMusicalTime');
  }

  initialize(Keys:string[]) {
    Keys.forEach(k => {
      this.$newScoreKey.append('<option>' + k + '</option>');
    })
  }

}

export = NewScoreStep3
