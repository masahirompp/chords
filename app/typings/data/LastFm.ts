var baseUrl = 'http://ws.audioscrobbler.com/2.0/?';
var key = 'a22bfd482489ef54c386b5975e9aa195';

/**
 * LastFM API のラッパー
 */
class LastFm {

  /**
   * 曲取得
   * @param id
   * @returns {JQueryXHR}
   */
  static findSong(id: string) {
    return $.getJSON(baseUrl + $.param({
      method: 'track.getinfo',
      mbid: id,
      api_key: key,
      format: 'json'
    }));
  }

  /**
   * アーティスト取得
   * @param id
   * @returns {JQueryXHR}
   */
  static findArtist(id: string) {
    return $.getJSON(baseUrl + $.param({
      method: 'artist.getinfo',
      mbid: id,
      api_key: key,
      format: 'json'
    }));
  }

  /**
   *
   * @param keyword
   * @param page
   * @returns {JQueryXHR}
   */
  static searchSong(keyword: string, page: number = 1) {
    return $.getJSON(baseUrl + $.param({
        method: 'track.search',
        track: keyword,
        page: page,
        limit: 10,
        api_key: key,
        format: 'json'
      }))
      .done(d => d.results.trackmatches.track);
  }

  /**
   *
   * @param keyword
   * @param page
   * @returns {JQueryXHR}
   */
  static searchArtist(keyword: string, page: number = 1) {
    return $.getJSON(baseUrl + $.param({
        method: 'artist.search',
        artist: keyword,
        page: page,
        limit: 10,
        api_key: key,
        format: 'json'
      }))
      .done(d => d.results.artistmatches.artist);
  }

  /**
   *
   * @param keyword
   * @param page
   * @returns {JQueryXHR}
   */
  static getArtistTopTrack(keyword: string, page: number = 1) {
    return $.getJSON(baseUrl + $.param({
        method: 'artist.gettoptracks',
        artist: keyword,
        autocorrect: 1,
        page: page,
        limit: 10,
        api_key: key,
        format: 'json'
      }))
      .done(d => d.toptracks.track);
  }

  /**
   * 曲名、アーティスト名の両方から曲を検索
   * @param keyword
   * @param page
   */
  static search(keyword: string, page: number = 1) {
    return $.when(LastFm.searchSong(keyword, page), LastFm.getArtistTopTrack(keyword, page))
      .done((s1, s2) => s1.concat(s2));
  }

}

export = LastFm