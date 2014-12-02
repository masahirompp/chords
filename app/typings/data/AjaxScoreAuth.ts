import ScoreDTO = require('../dto/ScoreDTO')

class AjaxScoreAuth {

  static getMySocres(): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/edit/scores');
  }

}

export = AjaxScoreAuth
