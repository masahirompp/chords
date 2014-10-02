import ScoreDTO = require('./../dto/ScoreDTO')

class AjaxScore {
  public static getScoreChordsData(uri:string):JQueryPromise<ScoreDTO> {
    var d:JQueryDeferred<ScoreDTO> = $.Deferred();

    $.ajax({
      url:'/api' + uri,
      dataType:'json',
      success: data => d.resolve(data),
      error: data => d.reject(data)
    });

    return d.promise();
  }
}

export = AjaxScore
