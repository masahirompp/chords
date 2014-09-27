import ArtistDTO = require('./ArtistDTO');

interface SongDTO {
  id: string;
  name: string;
  artist: ArtistDTO;
}

export = SongDTO
