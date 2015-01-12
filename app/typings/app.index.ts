/// <reference path="../../tsd/requirejs/require.d.ts" />
"use strict";

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./controller/IndexController'], (Controller) => {
  (new Controller())
  .setup();
});
