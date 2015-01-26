import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');
import EditScore = require('../viewmodel/EditScore');

class EditController {

  setup() {
    try {
      (new BaseController()).setupNav();
      EditScore.factory($('#score'));
    } catch (e) {
      ErrorHandle.send(e);
    }
  }
}

export = EditController
