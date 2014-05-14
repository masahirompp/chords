(function(define) {
  'use strict';

  define([], function() {

    function StaffHeight(height, staffSpace, lineSpace, underlineSpace, staffType, hasTitle, hasPageNo) {
      this.height = height;
      this.staffSpace = staffSpace;
      this.lineSpace = lineSpace;
      this.underlineSpace = underlineSpace;
      this.staffType = staffType;
      this.hasTitle = hasTitle;
      this.hasPageNo = hasPageNo;
    }


    return StaffHeight;

  });
})(this.define);
