"use strict";

require.config(< RequireConfig > {
  baseUrl: '/scripts'
});

require(['./controller/EditController'], (Controller) => {
  (new Controller()).setup();
});
