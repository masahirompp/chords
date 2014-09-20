/// <reference path="../../typings/tsd.d.ts" />

import BaseDTO = require('./dto.base')
import ScoreDTO = require('./dto.score')

class AjaxScore {
  public static getScoreChordsData(uri:string, callback:(ScoreDTO)=>void) {
    $.get('/api' + uri, (result:BaseDTO<ScoreDTO>) => {
      if(result.success) {
        return callback(result.data)
      }
      // TODO ERROR
    });
  }
}

export = AjaxScore
