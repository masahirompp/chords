import ScoreDTO = require('../dto/ScoreDTO')

class SearchView {

  public static $searchResult = $('#searchResult');
  public static $searchBtn = $('#searchBtn');
  public static $searchKeyword = $('#searchKeyword');

  public static drawResult(data: ScoreDTO[]) {
    this.$searchResult.empty();
    if (data.length === 0) {
      return;
    }
    var tmp = '<table class="table table-hover"><thead><th>曲名</th><th>アーティスト名</th><th>作成者</th><th></th></thead><tbody>';
    _.each(data, (d: ScoreDTO) => {
      tmp += this.makeRow(d);
    });
    tmp += '</tbody></table>';
    this.$searchResult.append(tmp);
  }

  public static makeRow(d: ScoreDTO): string {
    return '<tr><td>' + d.song.name + '</td><td>' + d.song.artist.name + '</td><td>' + d.author.name + '</td><td>' + d.description + '</td></tr>';
  }

}

export = SearchView;
