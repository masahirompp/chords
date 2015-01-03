import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');

class WorksController {

  setup() {
    try {
      (new BaseController()).setupNav();
    } catch (e) {
      ErrorHandle.send(e);
    }
  }
}

export = WorksController
