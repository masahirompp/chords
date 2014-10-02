
class AjaxScore {

  public static getScore():JQueryXHR {
    return $.getJSON('/api' + location.pathname);
  }


}

export = AjaxScore
