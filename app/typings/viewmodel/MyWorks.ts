import MyWorksResult = require('../view/MyWorksResult')
import Ajax = require('../data/Ajax');

class MyWorks {

  private observersResults: Function[] = [];

  /**
   * 初期化処理
   */
  initialize() {
    Ajax.getMyScores()
      .then(this.notifyResults.bind(this));
  }

  /**
   * さらに読み込む
   */
  more() {

  }

  /**
   * factory method
   * @param $myWorksResult
   * @returns {MyWorks}
   */
  static factory($myWorksResult: JQuery) {
    var myWorks = new MyWorks();
    var result = new MyWorksResult($myWorksResult, myWorks);
    myWorks.addObservers(result);
    myWorks.initialize();
    return myWorks;
  }

  private addObservers(result: MyWorksResult) {
    this.addObserverResults(result, result.update);
    this.addObserverResults(result, result.showMessage);
  }


  private addObserverResults(receiver: any, func: (result: any[]) => void) {
    this.observersResults.push(func.bind(receiver));
  }

  private notifyResults(results: any) {
    this.observersResults.forEach(func => setTimeout(() => func(results), 0));
  }
}

export = MyWorks
