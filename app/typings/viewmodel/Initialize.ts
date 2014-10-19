/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/ext/ext.d.ts" />

(($)=> {
  $.blockUIl = () => {
    $.blockUI({
      message: '<img src="/images/loading.gif" /> ',
      baseZ: 2000
    });
  };
})($);
