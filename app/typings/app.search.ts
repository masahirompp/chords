"use strict";

require.config( < RequireConfig > {
  baseUrl: '/scripts'
});

require(['./controller/SearchController'], (Controller) => {
  (new Controller()).setup();
});
