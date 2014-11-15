class UriUtil {

  static makeUri(artistName:string, songName:string, scoreNo:number):string {
    return '/' + encodeURIComponent(artistName) + '/' + encodeURIComponent(songName) + '/' + scoreNo.toString();
  }

}

export = UriUtil
