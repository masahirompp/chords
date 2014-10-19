import ScoreDTO = require('../dto/ScoreDTO');

class ScoreUtil {

  static makeUri(d: ScoreDTO) {
    return '/' + [encodeURIComponent(d.song.artist.name), encodeURIComponent(d.song.name), d.scoreNo].join('/');
  }

}

export = ScoreUtil;
