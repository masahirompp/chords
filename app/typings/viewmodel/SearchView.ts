import ScoreDTO = require('../dto/ScoreDTO')
import ScoreUtil = require('../util/ScoreUtil')

class SearchView {

  public static $searchResult = $('#searchResult');
  public static $searchBtn = $('#searchBtn');
  public static $searchKeyword = $('#searchKeyword');

  static regSpace = /\s+/g;

  public static drawResult(data: ScoreDTO[]) {
    this.$searchResult.empty();
    if (data.length === 0) {
      return;
    }
    var tmp = '<table class="table table-hover"><thead><th>曲名</th><th>アーティスト名</th><th>作成者</th><th></th></thead><tbody>';
    data.forEach((d: ScoreDTO) => {
      tmp += this.makeRow(d);
    });
    tmp += '</tbody></table>';
    this.$searchResult.append(tmp);
  }

  public static getKeyword(): string {
    var keyword = SearchView.$searchKeyword.val()
      .replace(this.regSpace, ' ')
      .trim();
    setTimeout(() => SearchView.$searchKeyword.val(keyword), 0);
    return keyword;
  }


  public static makeRow(d: ScoreDTO): string {
    return '<tr uri="' + ScoreUtil.makeUri(d) + '"><td>' + d.song.name + '</td><td>' + d.song.artist.name + '</td><td>' + d.author.name + '</td><td>' + d.description + '</td></tr>';
  }

  public static growlNoResult() {
    $.growl.notice({
      title: '検索結果0件',
      message: '曲名、アーティスト名を変えて検索してください。',
      location: 'underHeader',
      duration: 700
    });
  }

  public static changeDocumentTitle(keyword) {
    document.title = keyword + 'の検索結果 | ChordCliche';
  }


}

export = SearchView;