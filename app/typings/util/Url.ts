import Map = require('./Dictionary');

class Url {

  static getQueryByName(name:string):string {
    var regex = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  static getPath(url:string):string {
    if(url.match(/^http/)) {
      if(url.indexOf('/', 9) === -1) {
        return '/';
      }
      url = url.substring(url.indexOf('/', 9));
    }
    if(!url.match(/^\//)) {
      url = '/' + url;
    }
    if(url.indexOf('?') > 0) {
      url = url.substring(0, url.indexOf('?'));
    }
    if(url.indexOf('#') > 0) {
      url = url.substring(0, url.indexOf('#'));
    }
    return url;
  }

  static getHost(url:string):string {
    if(url.match(/^http/)) {
      return url.substring(0, url.indexOf('/', 9));
    }
    return location.host;
  }

  static getQueryString(url:string):string {
    if(url.indexOf('?')) {
      return url.substring(url.indexOf('?'), url.indexOf('#') === -1 ? null : url.indexOf('#'));
    }
    return '';
  }

  private _host = '';
  private _path = '';
  private _queryMap = new Map<string>();

  constructor(url?:string) {
    var query = '';

    if(url) {
      this._host = Url.getHost(url);
      this._path = Url.getPath(url);
      query = Url.getQueryString(url);
    } else {
      this._host = location.host;
      this._path = location.pathname;
      query = location.search;
    }

    _.forEach<string>(query.split(/\\?&/g), (keyValue:string) => {
      if(keyValue.indexOf('=') > 0) {
        var tmp = keyValue.split('=');
        this._queryMap.add(tmp[0], decodeURIComponent(tmp[1]));
      }
    });
  }

  getQueryValue(key:string):string {
    return this._queryMap.get(key);
  }

  updateQuery(key:string, value:string):Url {
    this._queryMap.store(key, value);
    return this;
  }

  removeQuery(key:string):Url {
    this._queryMap.remove(key);
    return this;
  }

  get host():string {
    return this._host;
  }

  get path():string {
    return this._path;
  }

  get url():string {
    return this._path + this.makeQueryString();
  }

  get getQueryKeys():string[] {
    return this._queryMap.keys;
  }

  private makeQueryString():string {
    var tmp = '';
    this._queryMap.keys.forEach((key) => {
      tmp = '&' + tmp + encodeURIComponent(key) + '=' + encodeURIComponent(this._queryMap.get(key));
    });

    return tmp ? '?' + tmp.substring(1) : '';
  }

}

export = Url
