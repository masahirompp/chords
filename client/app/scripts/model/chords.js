define(['util/list'], function(List) {
  'use strict';

  function Chords(songId) {

    // todo db read

    // nownow
    this._songId = songId;
    this._list = [
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm'],
      ['Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm', 'Fm']
    ];

    return this;
  }

  // inherit List
  Chords.prototype = Object.create(List.prototype);
  Chords.prototype.constructor = Chords;

  Chords.prototype.read = function() {
    return this._list;
  };

  Chords.prototype.save = function() {
    // todo db save
  };

  return Chords;

});
