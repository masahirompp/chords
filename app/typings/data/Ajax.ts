import ScoreDTO = require('../dto/ScoreDTO')
import Util = require('../util/Util');

class Ajax {

  public static getScore(artist?: string, song?: string, score?: string): JQueryXHR {
    if (arguments.length === 3) {
      return $.getJSON('/api/' + Util.joinUrl(artist, song, score));
    }
    return $.getJSON('/api' + location.pathname);
  }

  public static search(keyword: string): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/scores/search', {
        q: keyword
      })
      .then((data) => {
        return <ScoreDTO[] > data;
      });
  }


}

export = Ajax
