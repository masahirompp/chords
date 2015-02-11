import Interval = require('./Interval');
import HarmonicType = require('./HarmonicType');

var Harmony = [{
  input: '',
  sign: '',
  relatives: [Interval.P1, Interval.M3, Interval.P5],
  type: HarmonicType.MAJOR
}, {
  input: 'maj7',
  sign: 'M7',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.M7],
  type: HarmonicType.MAJOR
}, {
  input: 'maj9',
  sign: 'M9',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.M7, Interval.M9],
  type: HarmonicType.MAJOR
}, {
  input: '6',
  sign: '6',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.M6],
  type: HarmonicType.MAJOR6
}, {
  input: '69',
  sign: '69',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.M6, Interval.M9],
  type: HarmonicType.MAJOR6
}, {
  input: 'add9',
  sign: 'add9',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.M9],
  type: HarmonicType.MAJOR
}, {
  input: 'sus2',
  sign: 'sus2',
  relatives: [Interval.P1, Interval.P5, Interval.M2],
  type: HarmonicType.MAJOR
}, {
  input: 'sus4',
  sign: 'sus4',
  relatives: [Interval.P1, Interval.P4, Interval.P5],
  type: HarmonicType.MAJOR
}, {
  input: 'sus47',
  sign: 'sus47',
  relatives: [Interval.P1, Interval.P4, Interval.P5, Interval.m7],
  type: HarmonicType.MAJOR
}, {
  input: '7',
  sign: '7',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.m7],
  type: HarmonicType.DOMINANT7
}, {
  input: '9',
  sign: '9',
  relatives: [Interval.P1, Interval.M3, Interval.P5, Interval.m7, Interval.M9],
  type: HarmonicType.DOMINANT7
}, {
  input: 'm',
  sign: 'm',
  relatives: [Interval.P1, Interval.m3, Interval.P5],
  type: HarmonicType.MINOR
}, {
  input: 'm7',
  sign: 'm7',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.m7],
  type: HarmonicType.MINOR
}, {
  input: 'm9',
  sign: 'm9',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.m7, Interval.M9],
  type: HarmonicType.MINOR
}, {
  input: 'mM7',
  sign: 'mmaj7',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.M7],
  type: HarmonicType.MINOR
}, {
  input: 'mM9',
  sign: 'mmaj9',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.M7, Interval.M9],
  type: HarmonicType.MINOR
}, {
  input: 'm6',
  sign: 'm6',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.M6],
  type: HarmonicType.MINOR
}, {
  input: 'm69',
  sign: 'm69',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.M6, Interval.M9],
  type: HarmonicType.MINOR
}, {
  input: 'madd9',
  sign: 'madd9',
  relatives: [Interval.P1, Interval.m3, Interval.P5, Interval.M9],
  type: HarmonicType.MINOR
}, {
  input: 'm7-5',
  sign: 'm7-5',
  relatives: [Interval.P1, Interval.m3, Interval.D5, Interval.m7],
  type: HarmonicType.HALF_DIMINISH
}, {
  input: 'm9-5',
  sign: 'm9-5',
  relatives: [Interval.P1, Interval.m3, Interval.D5, Interval.m7, Interval.M2],
  type: HarmonicType.HALF_DIMINISH
}, {
  input: '-5',
  sign: '-5',
  relatives: [Interval.P1, Interval.M3, Interval.D5],
  type: HarmonicType.ALTERD
}, {
  input: '-57',
  sign: '-57',
  relatives: [Interval.P1, Interval.M3, Interval.D5, Interval.m7],
  type: HarmonicType.ALTERD
}, {
  input: '-59',
  sign: '-59',
  relatives: [Interval.P1, Interval.M3, Interval.D5, Interval.m7, Interval.M9],
  type: HarmonicType.ALTERD
}, {
  input: 'aug',
  sign: 'aug',
  relatives: [Interval.P1, Interval.M3, Interval.A5],
  type: HarmonicType.AUGUMENT
}, {
  input: 'aug7',
  sign: 'aug7',
  relatives: [Interval.P1, Interval.M3, Interval.A5, Interval.m7],
  type: HarmonicType.AUGUMENT
}, {
  input: 'aug9',
  sign: 'aug9',
  relatives: [Interval.P1, Interval.M3, Interval.A5, Interval.m7, Interval.M9],
  type: HarmonicType.AUGUMENT
}, {
  input: 'dim',
  sign: 'dim',
  relatives: [Interval.P1, Interval.m3, Interval.D5],
  type: HarmonicType.DIMINISH
}, {
  input: 'dim7',
  sign: 'dim7',
  relatives: [Interval.P1, Interval.m3, Interval.D5, Interval.M6],
  type: HarmonicType.DIMINISH
}, {
  input: 'dim9',
  sign: 'dim9',
  relatives: [Interval.P1, Interval.m3, Interval.D5, Interval.M6, Interval.M9],
  type: HarmonicType.DIMINISH
}];

export = Harmony
