import Message = require('../viewmodel/Message');

class ErrorHandle {

  static send(e) {
    try {
      $.post('/api/error', {
        err: e
      });
      Message.showDanger('大変申し訳ありません。システムでエラーが発生しました。ページを再度読み込んでください。');
    } catch (u) {
      console.log(u.toString());
      console.log(u.stack);
    } finally {
      console.log(e.toString());
      console.log(e.stack);
    }
  }

  static showAppError(message: string) {
    console.log(message);
    Message.showWarning(message);
  }
}

export = ErrorHandle
