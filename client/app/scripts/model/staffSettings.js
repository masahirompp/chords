define([], function() {
  'use strict';

  var StaffSettings = function() {};

  StaffSettings.prototype.getDefault = function() {
    return {
      margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      staffSpace: 100,
      lineSpace: 3,
      underlineSpace: 2,
      hasPageNo: true,
      staffType: 'staff',
      barCount: 4,
      musicalTime: 8,
      hasClef: true,
      hasKey: false,
      hasBarNo: false
    };
  };

  return StaffSettings;

});
