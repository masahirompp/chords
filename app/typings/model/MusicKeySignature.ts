import Key = require('./MusicKey')
import Tonarity = require('./MusicTonarity')

/**
 * 調号
 */
class MusicKeySignature {

  // major chord
  static C = new MusicKeySignature(Key.C, Tonarity.MAJOR, []);
  static Cs = new MusicKeySignature(Key.Cis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais, Key.Eis, Key.His]);
  static Df = new MusicKeySignature(Key.Des, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges]);
  static D = new MusicKeySignature(Key.D, Tonarity.MAJOR, [Key.Fis, Key.Cis]);
  static Ef = new MusicKeySignature(Key.Es, Tonarity.MAJOR, [Key.B, Key.Es, Key.As]);
  static E = new MusicKeySignature(Key.E, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis]);
  static F = new MusicKeySignature(Key.F, Tonarity.MAJOR, [Key.B]);
  static Fs = new MusicKeySignature(Key.Fis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais, Key.Eis]);
  static Gf = new MusicKeySignature(Key.Ges, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges, Key.Ces]);
  static G = new MusicKeySignature(Key.G, Tonarity.MAJOR, [Key.Fis]);
  static Af = new MusicKeySignature(Key.As, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des]);
  static A = new MusicKeySignature(Key.A, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis]);
  static Bf = new MusicKeySignature(Key.B, Tonarity.MAJOR, [Key.B, Key.Es]);
  static B = new MusicKeySignature(Key.H, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais]);
  static Cf = new MusicKeySignature(Key.C, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges, Key.Ces, Key.Fes]);

  // minor chord
  static Cm = new MusicKeySignature(Key.C, Tonarity.MAJOR, [Key.B, Key.Es, Key.As]);
  static Csm = new MusicKeySignature(Key.Cis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis]);
  static Dm = new MusicKeySignature(Key.D, Tonarity.MAJOR, [Key.B]);
  static Dsm = new MusicKeySignature(Key.Dis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais, Key.Eis]);
  static Efm = new MusicKeySignature(Key.Es, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges, Key.Ces]);
  static Em = new MusicKeySignature(Key.E, Tonarity.MAJOR, [Key.Fis]);
  static Fm = new MusicKeySignature(Key.F, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des]);
  static Fsm = new MusicKeySignature(Key.Fis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis]);
  static Gm = new MusicKeySignature(Key.G, Tonarity.MAJOR, [Key.B, Key.Es]);
  static Gsm = new MusicKeySignature(Key.Gis, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais]);
  static Afm = new MusicKeySignature(Key.As, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges, Key.Ces, Key.Fes]);
  static Am = new MusicKeySignature(Key.A, Tonarity.MAJOR, []);
  static Asm = new MusicKeySignature(Key.Ais, Tonarity.MAJOR, [Key.Fis, Key.Cis, Key.Gis, Key.Dis, Key.Ais, Key.Eis, Key.His]);
  static Bfm = new MusicKeySignature(Key.B, Tonarity.MAJOR, [Key.B, Key.Es, Key.As, Key.Des, Key.Ges]);
  static Bm = new MusicKeySignature(Key.H, Tonarity.MAJOR, [Key.Fis, Key.Cis]);

  constructor(public tonic: Key, public tonarity: Tonarity, public signature: Key[]) {}

}

export = MusicKeySignature
