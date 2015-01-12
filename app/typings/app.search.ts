"use strict";

require.config( < RequireConfig > {
  baseUrl: '/scripts',
  paths: {
    immutable: '/bower_components/immutable/dist/immutable.min',
    d3: '/bower_components/d3/d3.min'
  }
});

require(['./controller/SearchController'], (Controller) => {
  (new Controller())
  .setup();
});