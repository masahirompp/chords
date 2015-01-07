/**
 * 変化記号
 */
class MusicAccidental {
  static SHARP = new MusicAccidental('sharp','#', 1);
  static FLAT = new MusicAccidental('flat','♭', -1);
  static NATURAL = new MusicAccidental('natural','', 0);

  static List = [MusicAccidental.SHARP, MusicAccidental.NATURAL, MusicAccidental.FLAT];

  constructor(public value: string, public sign: string, public relative: number) {}
}

export = MusicAccidental
