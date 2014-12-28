import NewScore = require('../viewmodel/NewScore')

class NewScoreStep2 {

  private $original: JQuery;
  private $existing: JQuery;

  constructor(public $step2: JQuery, newScore: NewScore) {
    this.$original = $step2.find('[name="original"]');
    this.$existing = $step2.find('[name="existing"]');
  }

  show(isOriginal: boolean){
    isOriginal ? this.showOriginal() : this.showExisting();
  }

  private showOriginal(){
    this.$existing.hide();
    this.$original.show();
  }

  private showExisting(){
    this.$original.hide();
    this.$existing.show();
  }

}

export = NewScoreStep2
