/// <reference path="../../../tsd/typeahead/typeahead.d.ts" />

import Ajax = require('./Ajax');

/**
 * LastFM API のラッパー
 */
class LastFm {

  static getInstance() {
    return Ajax.getConfig()
      .then(config => {
        return new LastFm(config.lastfm.api_key, 'http://ws.audioscrobbler.com/2.0/?');
      });
  }

  constructor(public api_key, public baseUrl) {}

  /**
   * 曲取得
   * @param id
   * @returns {JQueryXHR}
   */
  findSong(id: string) {
    return $.getJSON(this.baseUrl + $.param({
      method: 'track.getinfo',
      mbid: id,
      api_key: this.api_key,
      format: 'json'
    }));
  }

  /**
   * アーティスト取得
   * @param id
   * @returns {JQueryXHR}
   */
  findArtist(id: string) {
    return $.getJSON(this.baseUrl + $.param({
      method: 'artist.getinfo',
      mbid: id,
      api_key: this.api_key,
      format: 'json'
    }));
  }

  /**
   * トラック検索のsuggest生成
   * @returns {Bloodhound}
   */
  makeBloodhoundTrackSearch(): Bloodhound < any > {
    return new Bloodhound({
      datumTokenizer: d => {
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 30,
      remote: {
        url: this.baseUrl + $.param({
          method: 'track.search',
          track: 'QUERY',
          api_key: this.api_key,
          format: 'json'
        }),
        wildcard: 'QUERY',
        filter: d => d.results.trackmatches.track
      }
    });
  }
}

export = LastFm
