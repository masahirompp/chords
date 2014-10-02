import SongDTO = require('./_SongDTO')
import AuthorDTO = require('./_AuthorDTO')

interface ScoreDTO {
  author: AuthorDTO;
  song: SongDTO;
  scoreNo: number;
  star: number;
  description: string;
  chords : Array<Array<string>>;
  option : any;
}

export = ScoreDTO
