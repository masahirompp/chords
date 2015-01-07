/// <reference path="../../../tsd/typeahead/typeahead.d.ts" />

import LastFm = require('../data/LastFm');
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
    this.$originalTitle = this.$original.find('#newScoreOriginalTitle');
    this.$existingSong = this.$existing.find('#newScoreExistingSong');
    this.setupTypeahead();

    this.$originalTitle.on('keyup', () => {
      Helper.thinOut(() => {
        newScore.validateStep2Original(this.$originalTitle.val());
      });
    });

    this.$existingSong.on('typeahead:selected', (e, d) => {
      newScore.validateStep2Existing(d);
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
    setTimeout(() => this.$originalTitle.focus()
      .select(), 100);
  }

  private showExisting() {
    this.$original.hide();
    this.$existing.show();
    setTimeout(() => this.$existingSong.focus()
      .select(), 100);
    setTimeout(this.setSuggestHeight.bind(this), 1000);
  }

  private setupTypeahead() {
    LastFm.getInstance()
      .then(lastFm => {
        var tracks = lastFm.makeBloodhoundTrackSearch();
        tracks.initialize();
        this.$existingSong.typeahead({
          highlight: true
        }, {
          name: 'track',
          displayKey: d => d.name + ' / ' + d.artist,
          source: tracks.ttAdapter(),
          templates: {
            suggestion: d => '<p>' + d.name + ' / ' + d.artist + '</p>'
          }
        });
      });
  }

  private setSuggestHeight() {
    var top = this.$existingSong.offset()
      .top;
    if (top) {
      var height = $(document)
        .height() - top - 50;
      this.$existing.find('.tt-dropdown-menu')
        .css('max-height', height + 'px');
    }
  }
}

export = NewScoreStep2
