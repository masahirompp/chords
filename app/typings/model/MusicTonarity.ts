/**
 * 調性
 */
class MusicTonarity {
  static MAJOR = new MusicTonarity('');
  static MINOR = new MusicTonarity('m');
  constructor(public value: string) {}
}

export = MusicTonarity
