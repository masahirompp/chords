class AjaxScore {

  public static getScore():JQueryXHR {
    return $.getJSON('/api' + location.pathname);
  }

  public static search(keyword:string):JQueryXHR {
    return $.post('/api/search', {keyword: keyword});
  }

}

export = AjaxScore
