define(function(require) {
  'use strict';

  var music = require('model/Music');

  describe('Music', function() {
    var pitch = music.pitch();

    describe('pitch', function() {
      it('pitchは21個', function() {
        pitch.should.have.length(21);
      });
    });

    describe('findPitch', function() {
      var findPitch = music.findPitch;
      it('c => {input: "c", sign: "C"}', function() {
        findPitch('c')
          .should.eql({
            input: 'c',
            sign: 'C',
            position: 0
          });
      });
      it('fs => {input: "fs", sign: "F#"}', function() {
        findPitch('fs')
          .should.eql({
            input: "fs",
            sign: "F#",
            position: 6
          });
      });
      it('D => {input: "d", sign: "D"}', function() {
        findPitch('D')
          .should.eql({
            input: 'd',
            sign: 'D',
            position: 2
          });
      });
      it('Eb => {input: "ef", sign: "Eb"}', function() {
        findPitch('Eb')
          .should.eql({
            input: "ef",
            sign: "Eb",
            position: 3
          });
      });
    });

    describe('findChord', function() {
      var findChord = music.findChord;
      it('c => {"root":{"position":0,"input":"c","sign":"C"},"harmony":{"input":"","sign":"","relatives":[0,4,7],"type":0}}', function() {
        findChord('c')
          .should.eql({
            root: {
              input: 'c',
              sign: 'C',
              position: 0
            },
            harmony: {
              input: '',
              sign: '',
              relatives: [0, 4, 7],
              type: 0
            },
            tension: void 0,
            bass: void 0
          });
      });
    });

    describe('inputToSign', function() {
      it('c => C', function() {
        music.inputToSign('c').should.equal('C');
      });
      it('df => Db', function() {
        music.inputToSign('df').should.equal('Db');
      });
      it('e7 => E7', function() {
        music.inputToSign('e7').should.equal('E7');
      });
      it('fsm7 => F#m7', function() {
        music.inputToSign('fsm7').should.equal('F#m7');
      });
      it('gsus4 => Gsus4', function() {
        music.inputToSign('gsus4').should.equal('Gsus4');
      });
      it('adim7 => Adim7', function() {
        music.inputToSign('adim7').should.equal('Adim7');
      });
      it('bfm9 => Bbm9', function() {
        music.inputToSign('bfm9').should.equal('Bbm9');
      });
      it('cong => ConG', function() {
        music.inputToSign('cong').should.equal('ConG');
      });
      it('df(s11) => Db(#11)', function() {
        music.inputToSign('df(s11)').should.equal('Db');
      });
      it('e7(f9,s9) => E7(b9,#9)', function() {
        music.inputToSign('e7(f9,s9)').should.equal('E7(b9,#9)');
      });
      it('fsm7 => F#m7', function() {
        music.inputToSign('fsm7').should.equal('F#m7');
      });
      it('gsus4 => Gsus4', function() {
        music.inputToSign('gsus4').should.equal('Gsus4');
      });
      it('adim7 => Adim7', function() {
        music.inputToSign('adim7').should.equal('Adim7');
      });
      it('bfm9 => Bbm9', function() {
        music.inputToSign('bfm9').should.equal('Bbm9');
      });
    });

  });

});
