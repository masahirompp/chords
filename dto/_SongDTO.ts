import ArtistDTO = require('./_ArtistDTO');

interface SongDTO {
  id: string;
  name: string;
  artist: ArtistDTO;
}

export = SongDTO
