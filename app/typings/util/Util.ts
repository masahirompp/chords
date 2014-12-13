import Map = require('./Dictionary');

class Util {

  static getQueryByName(name: string): string {
    var regex = new RegExp("[\\?&]" + name.replace(/[\[]/, "\\[")
      .replace(/[\]]/, "\\]") + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  static makeQueryParameter(key: string, value: string): string {
    if (!value) {
      return '';
    }
    return '?' + key + '=' + value.split(/[ 　]+/g)
      .map(d => encodeURIComponent(d))
      .join('+');
  }

  static getPath(url: string): string {
    if (url.match(/^http/)) {
      if (url.indexOf('/', 9) === -1) {
        return '/';
      }
      url = url.substring(url.indexOf('/', 9));
    }
    if (!url.match(/^\//)) {
      url = '/' + url;
    }
    if (url.indexOf('?') > 0) {
      url = url.substring(0, url.indexOf('?'));
    }
    if (url.indexOf('#') > 0) {
      url = url.substring(0, url.indexOf('#'));
    }
    return url;
  }

  static getHostName(url: string): string {
    if (url.match(/^http/)) {
      return url.substring(0, url.indexOf('/', 9));
    }
    return location.host;
  }

  static getQueryString(url: string): string {
    if (url.indexOf('?')) {
      return url.substring(url.indexOf('?'), url.indexOf('#') === -1 ? null : url.indexOf('#'));
    }
    return '';
  }

  static joinUrl(...paths: string[]): string {
    return paths.map(path => encodeURIComponent(path))
      .join('/');
  }

}

export = Util
