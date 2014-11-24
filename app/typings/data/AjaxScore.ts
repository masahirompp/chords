import ScoreDTO = require('../dto/ScoreDTO')

class AjaxScore {

  public static getScore(): JQueryXHR {
    return $.getJSON('/api' + location.pathname);
  }

  public static search(keyword: string): JQueryPromise < ScoreDTO[] > {
    return $.post('/api/search', {
        keyword: keyword
      })
      .then((data) => {
        return <ScoreDTO[] > data;
      });
  }

  public static searchByAuthor(authorName: string): JQueryPromise < ScoreDTO[] > {
    return $.post('/api/query', {
        query: {
          authorName: authorName
        }
      })
      .then((data) => {
        return <ScoreDTO[] > data;
      });
  }

}

export = AjaxScore