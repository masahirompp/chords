import MyWorks = require('../viewmodel/MyWorks')
import Message = require('./Message');
import ViewHelper = require('./ViewHelper');
import ScoreDTO = require('../dto/ScoreDTO');

class MyWorksResult {

  private $results: JQuery;

  constructor($results: JQuery, myWorks: MyWorks) {
    this.$results = $results;

    this.$results.on('click', 'tbody tr', function() {
      window.location.href = '/works' + this.title;
    });
  }

  /**
   * 検索結果表示
   * @param scores
   */
  update(scores: ScoreDTO[]) {
    var html = scores.reduce((html: string, s: ScoreDTO) => {
      return html + '<tr title="/' + ViewHelper.joinUrl(s.song.artist.name, s.song.name, s.scoreNo.toString()) + '"><td>' + s.song.name + '</td><td>' + s.song.artist.name + '</td><td>' + '</td><td>' + s.description + '</td></tr>';
    }, '<table class="table table-hover"><thead><th>曲名</th><th>アーティスト名</th><th></th><th></th></thead>');
    this.$results
      .empty()
      .append(html + '<tbody></tbody><tfoot></tfoot></table>');
  }

  /**
   * 0件メッセージを表示
   * @param scores
   */
  showMessage(scores: ScoreDTO[]) {
    Message.remove();
    if (scores.length === 0) {
      Message.showWarning('作成したコード譜はありません。');
    }
  }

  /**
   * more info
   * @param scores
   */
  more(scores: ScoreDTO[]) {

  }

}

export = MyWorksResult
