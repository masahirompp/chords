class Message {

  static $container = $('#container');

  static showSuccess(message: string): void {
    Message.showMessage('success', message);
  }

  static showInfo(message: string): void {
    Message.showMessage('info', message);
  }

  static showWarning(message: string): void {
    Message.showMessage('warning', message);
  }

  static showDanger(message: string): void {
    Message.showMessage('danger', message);
  }

  static remove():void{
    $('.alert').alert('close');
  }

  /**
   *
   * @param level success, info, warning, danger
   * @param message
   */
  private static showMessage(level: string, message: string): void {
    Message
      .$container
      .prepend('<div class="alert alert-' + level + ' alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span>' +
        '<span class="sr-only">Close</span></button>' + message + '</div>');
  }
}

export = Message;
