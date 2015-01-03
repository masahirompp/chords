import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');

import Ajax = require('../data/Ajax');
import Util = require('../util/Util');
import Score = require('../func/ScoreController');

class ScoreController {

  setup() {
    try {
      (new BaseController()).setupNav();

      Ajax.getScore(Util.splitUrl()[0], Util.splitUrl()[1], Util.splitUrl()[2])
        .then(data => Score.draw(data))
        .fail(err => ErrorHandle.send(err));

    } catch (e) {
      ErrorHandle.send(e);
    }
  }

}

export = ScoreController
