/// <reference path="../../tsd/requirejs/require.d.ts" />
"use strict";

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./controller/WorksController'], (Controller) => {
  (new Controller()).setup();
});
