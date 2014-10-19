/// <reference path="../tsd/tsd.d.ts" />

import db = require('../db/db');

class Gather {

  static saveClientError(err: any) {
    var document = new db.ClientError({
      data: err
    });
    document.save();
  }

}
