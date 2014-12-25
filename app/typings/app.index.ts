/// <reference path="../../tsd/requirejs/require.d.ts" />

require.config(< RequireConfig > {
  baseUrl: '/scripts'
});

require(['./viewmodel/Event', './util/ErrorHandle'], (Event, ErrorHandle) => {
  try {
    Event.initIndex();
  } catch(e) {
    ErrorHandle.send(e);
  } finally {
    $.unblockUI();
  }
});
