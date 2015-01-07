import Temperament = require('./MusicTemperament')
import Accidental = require('./MusicAccidental')

/**
 * 音程
 */
class MusicKey {

  static Ces = new MusicKey(Temperament.C, Accidental.FLAT, 11);
  static C = new MusicKey(Temperament.C, Accidental.NATURAL, 0);
  static Cis = new MusicKey(Temperament.C, Accidental.SHARP, 1);
  static Des = new MusicKey(Temperament.D, Accidental.FLAT, 1);
  static D = new MusicKey(Temperament.D, Accidental.NATURAL, 2);
  static Dis = new MusicKey(Temperament.D, Accidental.SHARP, 3);
  static Es = new MusicKey(Temperament.E, Accidental.FLAT, 3);
  static E = new MusicKey(Temperament.E, Accidental.NATURAL, 4);
  static Eis = new MusicKey(Temperament.E, Accidental.SHARP, 5);
  static Fes = new MusicKey(Temperament.F, Accidental.FLAT, 4);
  static F = new MusicKey(Temperament.F, Accidental.NATURAL, 5);
  static Fis = new MusicKey(Temperament.F, Accidental.SHARP, 6);
  static Ges = new MusicKey(Temperament.G, Accidental.FLAT, 6);
  static G = new MusicKey(Temperament.G, Accidental.NATURAL, 7);
  static Gis = new MusicKey(Temperament.G, Accidental.SHARP, 8);
  static As = new MusicKey(Temperament.A, Accidental.FLAT, 8);
  static A = new MusicKey(Temperament.A, Accidental.NATURAL, 9);
  static Ais = new MusicKey(Temperament.A, Accidental.SHARP, 10);
  static B = new MusicKey(Temperament.B, Accidental.FLAT, 10);
  static H = new MusicKey(Temperament.B, Accidental.NATURAL, 11);
  static His = new MusicKey(Temperament.B, Accidental.SHARP, 0);

  /**
   * 音程のリスト
   * @type {any[]}
   */
  static List = [
    MusicKey.Ces,
    MusicKey.C,
    MusicKey.Cis,
    MusicKey.Des,
    MusicKey.D,
    MusicKey.Dis,
    MusicKey.Es,
    MusicKey.E,
    MusicKey.Eis,
    MusicKey.Fes,
    MusicKey.F,
    MusicKey.Fis,
    MusicKey.Ges,
    MusicKey.G,
    MusicKey.Gis,
    MusicKey.As,
    MusicKey.A,
    MusicKey.Ais,
    MusicKey.B,
    MusicKey.H,
    MusicKey.His
  ];

  constructor(public base: Temperament, public baseAccidental: Accidental, public position: number) {}

  /**
   * 音程の文字列を返す
   * @returns {string} C#, B♭, Eなど
   */
  get value(): string {
    return this.base.value + this.baseAccidental.sign;
  }

  /**
   * 移調する
   */
  transposition(relative: number): MusicKey[] {
    var transpositioned = (this.position + relative) % 12;
    return MusicKey.List.filter(key => key.position === transpositioned);
  }
}

export = MusicKey