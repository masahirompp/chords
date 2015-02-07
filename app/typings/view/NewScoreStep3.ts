import Music = require('../model/Music')
import NewScore = require('../viewmodel/NewScore')
import ViewHelper = require('ViewHelper')

class NewScoreStep3 {

  private $newScoreKey: JQuery;
  private $description: JQuery;
  private $musicalTime: JQuery;

  constructor($step3: JQuery, newScore: NewScore) {
    this.$newScoreKey = $step3.find('#newScoreKey');
    this.$description = $step3.find('#newScoreDescription');
    this.$musicalTime = $step3.find('#newScoreMusicalTime');

    this.$newScoreKey.on('change', e => newScore.setKey(this.$newScoreKey.val()));
    this.$musicalTime.on('change', e => newScore.setMusicalTime(this.$musicalTime.val()));
    this.$description.on('change', e => newScore.setDescription(ViewHelper.trim(this.$description.val())));
  }

  initialize(keys: () => Music.Signature.Keys) {
    keys()
      .toArray()
      .forEach(k => {
        this.$newScoreKey.append('<option>' + k + '</option>');
      })
  }

}

export = NewScoreStep3
