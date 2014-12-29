class ViewHelper {

  /**
   * 連続的なイベントを間引く
   * @param callback
   * @param duration
   */
  static thinOut(callback, duration: number = 200) {
    var timer: number;
    clearTimeout(timer);
    timer = setTimeout(callback, duration);
  }
}

export  = ViewHelper
