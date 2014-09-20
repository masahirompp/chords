/// <reference path="../../typings/tsd.d.ts" />

require.config(<RequireConfig>{baseUrl: 'scripts'});

import AjaxScore = require('./data.ajaxScore')
import func = require('./func.draw')

console.log('index');
console.log('Running jQuery %s', $().jquery);

$(function() {
  AjaxScore.getScoreChordsData(location.pathname, func.draw);
});
