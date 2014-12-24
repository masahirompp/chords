import SongDTO = require('./SongDTO')
import UserDTO = require('./UserDTO')

interface ScoreDTO {
  user: UserDTO;
  song: SongDTO;
  scoreNo: number;
  star: number;
  description: string;
  chords : Array<Array<string>>;
  option : any;
}

export = ScoreDTO
