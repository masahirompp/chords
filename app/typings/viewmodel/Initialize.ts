/// <reference path="../../../tsd/jquery/jquery.d.ts" />
/// <reference path="../../../tsd/blockui/jquery.blockUI.d.ts" />
/// <reference path="../../../tsd/ext/ext.d.ts" />

(($) => {
  $.blockUIl = () => {
    $.blockUI({
      message: null,
      baseZ: 2000,
      fadeIn: 0
    });
  };
})($);