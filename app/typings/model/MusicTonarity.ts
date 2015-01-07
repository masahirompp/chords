/**
 * 調性
 */
class MusicTonarity {
  static MAJOR = new MusicTonarity('major');
  static MINOR = new MusicTonarity('minor');
  constructor(public value: string) {}
}

export = MusicTonarity
