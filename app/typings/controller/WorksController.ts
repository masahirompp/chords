import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');
import MyWorks = require('../viewmodel/MyWorks');

class WorksController {

  setup() {
    try {
      (new BaseController()).setupNav();
      MyWorks.factory($('#myWorks'));
    } catch (e) {
      ErrorHandle.send(e);
    }
  }
}

export = WorksController
