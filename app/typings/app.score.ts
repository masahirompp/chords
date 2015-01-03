"use strict";

require.config(< RequireConfig > {
  baseUrl: '/scripts'
});

require(['./controller/ScoreController'], (Controller) => {
  (new Controller()).setup();
});
