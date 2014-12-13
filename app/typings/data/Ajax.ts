import ScoreDTO = require('../dto/ScoreDTO')
import AuthorDTO = require('../dto/AuthorDTO')
import Util = require('../util/Util')

class Ajax {

  public static getUsers(): JQueryPromise < AuthorDTO[] > {
    return $.get('/api/users');
  }

  public static searchUsers(keyword): JQueryPromise < AuthorDTO[] > {
    return $.get('/api/users/search', {
      q: keyword
    });
  }

  public static getUser(id): JQueryPromise < AuthorDTO[] > {
    return $.get('/api/users/' + id);
  }

  public static getUserScores(id): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/users/' + id + '/scores');
  }

  public static getScores(): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/scores');
  }

  public static searchScores(keyword: string): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/scores/search', {
      q: keyword
    });
  }

  public static getArtistScores(artist: string): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/scores/' + Util.joinUrl(artist));
  }

  public static getSongScores(artist: string, song: string): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/scores/' + Util.joinUrl(artist, song));
  }

  public static getScore(artist: string, song: string, score: string): JQueryPromise < ScoreDTO > {
    return $.getJSON('/api/' + Util.joinUrl(artist, song, score));
  }

  public static getMyScores(): JQueryPromise < ScoreDTO[] > {
    return $.get('/api/works');
  }

  public static createNewOriginalScore(songName: string, description: string): JQueryPromise < ScoreDTO > {
    return $.post('/api/works', {
      isOriginal: true,
      song: songName,
      description: description
    });
  }

  public static createNewExistingScore(artistId: string, artistName: string, songId: string, songName: string, description: string): JQueryPromise < ScoreDTO > {
    return $.post('/api/works', {
      isOriginal: false,
      artistId: artistId,
      artistName: artistName,
      songId: songId,
      songName: songName,
      description: description
    });
  }

  public static getMyScore(artist: string, song: string, score: string): JQueryPromise < ScoreDTO > {
    return $.getJSON('/api/works/' + Util.joinUrl(artist, song, score));
  }

}

export = Ajax
