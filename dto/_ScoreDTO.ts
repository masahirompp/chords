import SongDTO = require('./_SongDTO')

interface ScoreDTO {
  user: any;
  song: SongDTO;
  scoreNo: number;
  star: number;
  description: string;
  chords : Array<Array<string>>;
  option : any;
}

export = ScoreDTO
