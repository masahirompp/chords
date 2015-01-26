import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');
import MyWorks = require('../viewmodel/MyWorks');

class EditController {

  setup() {
    try {
      (new BaseController()).setupNav();


    } catch (e) {
      ErrorHandle.send(e);
    }
  }
}

export = EditController
