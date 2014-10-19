class ErrorHandle {

  static send(e: Error) {
    try {
      $.post('/api/error', {
        err: e
      });
    } catch (u) {
      console.dir(e);
      console.dir(u);
    }
  }

}

export = ErrorHandle