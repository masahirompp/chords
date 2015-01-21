import ScoreDTO = require('../dto/ScoreDTO')
import UserDTO = require('../dto/UserDTO')
import Util = require('../util/Util')

var cache: any = null;
class Ajax {

  static getConfig(): JQueryPromise < any > {
    if (cache) {
      return cache;
    }
    cache = $.getJSON('/api/config');
    return cache;
  }

  static getUsers(): JQueryPromise < UserDTO[] > {
    return $.getJSON('/api/users');
  }

  static searchUsers(keyword): JQueryPromise < UserDTO[] > {
    return $.getJSON('/api/users/search', {
      q: keyword
    });
  }

  static getUser(id): JQueryPromise < UserDTO[] > {
    return $.getJSON('/api/users/' + id);
  }

  static getUserScores(id): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/users/' + id + '/scores');
  }

  static getScores(): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/scores');
  }

  static searchScores(keyword: string): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/scores/search', {
      q: keyword
    });
  }

  static getArtistScores(artist: string): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/scores/' + Util.joinUrl(artist));
  }

  static getSongScores(artist: string, song: string): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/scores/' + Util.joinUrl(artist, song));
  }

  static getScore(artist: string, song: string, score: string): JQueryPromise < ScoreDTO > {
    return $.getJSON('/api/' + Util.joinUrl(artist, song, score));
  }

  static getMyScores(): JQueryPromise < ScoreDTO[] > {
    return $.getJSON('/api/works');
  }

  static createNewOriginalScore(songName: string, description: string, key: string, musicalTime: string): JQueryPromise < ScoreDTO > {
    console.log(arguments);
    return $.post('/api/works', {
      isOriginal: true,
      song: songName,
      description: description,
      key: key,
      musicalTime: musicalTime
    });
  }

  static createNewExistingScore(artistId: string, artistName: string, songId: string, songName: string, description: string, key: string, musicalTime: string): JQueryPromise < ScoreDTO > {
    console.log(arguments);
    return $.post('/api/works', {
      isOriginal: null,
      artistId: artistId,
      artistName: artistName,
      songId: songId,
      songName: songName,
      description: description,
      key: key,
      musicalTime: musicalTime
    });
  }

  static getMyScore(artist: string, song: string, score: string): JQueryPromise < ScoreDTO > {
    return $.getJSON('/api/works/' + Util.joinUrl(artist, song, score));
  }

}

export = Ajax
