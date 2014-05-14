(function(define) {
  'use strict';

  define(['jquery'], function($) {

    console.log('Running jQuery %s', $()
      .jquery);
    console.log('index.js');

    return false;

  });
})(this.define);
