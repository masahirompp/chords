import Message = require('../viewmodel/Message');

class ErrorHandle {

  static send(e: Error) {
    try {
      $.post('/api/error', {
        err: e
      });
      Message.showDanger(e.message);
    } catch (u) {
      console.dir(e);
      console.dir(u);
    }
  }

  static showAppError(message: string) {
    console.log(message);
    Message.showWarning(message);
  }

}

export = ErrorHandle
