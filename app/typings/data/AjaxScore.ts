import BaseDTO = require('./../dto/BaseDTO')
import ScoreDTO = require('./../dto/ScoreDTO')

class AjaxScore {
  public static getScoreChordsData(uri:string, callback:(ScoreDTO)=>void) {
    $.getJSON('/api' + uri, (result:BaseDTO<ScoreDTO>) => {
      if(result.success) {
        return callback(result.data)
      }
      // TODO ERROR
    });
  }
}

export = AjaxScore
