/**
 * 音階
 */
class MusicTemperament {

  static C = new MusicTemperament('C');
  static D = new MusicTemperament('D');
  static E = new MusicTemperament('E');
  static F = new MusicTemperament('F');
  static G = new MusicTemperament('G');
  static A = new MusicTemperament('A');
  static B = new MusicTemperament('H');

  static List = [MusicTemperament.C, MusicTemperament.D, MusicTemperament.E, MusicTemperament.F, MusicTemperament.G, MusicTemperament.A, MusicTemperament.B];

  constructor(public value: string) {}
}

export = MusicTemperament
