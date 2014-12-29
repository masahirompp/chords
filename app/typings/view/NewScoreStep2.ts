import NewScore = require('../viewmodel/NewScore')
import Helper = require('./ViewHelper');

class NewScoreStep2 {

  private $original: JQuery;
  private $existing: JQuery;
  private $originalTitle: JQuery;
  private $existingSong: JQuery;

  constructor(public $step2: JQuery, newScore: NewScore) {
    this.$original = $step2.find('[name="original"]');
    this.$existing = $step2.find('[name="existing"]');
    this.$originalTitle = this.$original.find('#originalTitle');
    this.$existingSong = this.$existing.find('#existingSong');

    this.$originalTitle.on('keyup', () => {
      Helper.thinOut(() => {
        newScore.validateStep2Original(this.$originalTitle.val());
      });
    });
  }

  initialize() {
    this.$originalTitle.val('');
  }

  show(isOriginal: boolean) {
    isOriginal ? this.showOriginal() : this.showExisting();
  }

  private showOriginal() {
    this.$existing.hide();
    this.$original.show();
    setTimeout(() => this.$originalTitle.focus(), 100);
  }

  private showExisting() {
    this.$original.hide();
    this.$existing.show();
    setTimeout(() => this.$existingSong.focus(), 100);
  }

}

export = NewScoreStep2
