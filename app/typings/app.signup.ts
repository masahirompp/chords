/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event', './util/ErrorHandle'], (Event, ErrorHandle) => {

  $(() => {
    try {
      Event.initSignup();
      $.unblockUI();
    } catch (e) {
      ErrorHandle.send(e);
      $.unblockUI();
    }
  });
});
