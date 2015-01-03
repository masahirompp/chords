import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');

class SearchController {

  setup() {
    try {
      (new BaseController()).setupNav();
    } catch (e) {
      ErrorHandle.send(e);
    }
  }
}

export = SearchController

