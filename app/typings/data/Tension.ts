import Interval = require('Interval');

var Tension = [{
  input: 'f9',
  sign: '♭9',
  relatives: [Interval.f9],
  covered: [Interval.n9]
}, {
  input: '9',
  sign: '9',
  relatives: [Interval.n9],
  covered: [Interval.f9, Interval.s9]
}, {
  input: 's9',
  sign: '#9',
  relatives: [Interval.s9],
  covered: [Interval.n9, Interval.f9]
}, {
  input: '11',
  sign: '11',
  relatives: [Interval.n11],
  covered: [Interval.f9, Interval.n9, Interval.s9, Interval.s11]
}, {
  input: 's11',
  sign: '#11',
  relatives: [Interval.s11],
  covered: [Interval.f9, Interval.n9, Interval.s9, Interval.n11]
}, {
  input: 'f13',
  sign: '♭13',
  relatives: [Interval.n13],
  covered: [Interval.f9, Interval.n9, Interval.s9, Interval.n11, Interval.s11, Interval.f13]
}, {
  input: '13',
  sign: '13',
  relatives: [Interval.f13],
  covered: [Interval.f9, Interval.n9, Interval.s9, Interval.n11, Interval.s11, Interval.n13]
}];

export = Tension
