import Message = require('../view/Message');

class ErrorHandle {

  /**
   * 初期化処理。グローバルエラーハンドル
   */
  static init() {
    try {
      // global error handle
      window.onerror = () => {
        $.post('/api/error', arguments);
      }
    } catch (e) {
      ErrorHandle.send(e);
    } finally {
      try{
        $.unblockUI();
      }catch(u){
        ErrorHandle.send(u);
      }
    }
  }

  /**
   * エラー処理
   * @param e
   */
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
}

export = ErrorHandle
