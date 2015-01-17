import BaseController = require('./BaseController');
import ErrorHandle = require('../util/ErrorHandle');
import Music = require('../model/Music')

class IndexController {

  setup() {
    try {
      (new BaseController()).setupNav();

      console.log(Music.Chord.inputToSign('csm7(s11,f13)onff'));
      console.log(Music.Chord.signToInput('C#m7(#11,♭13)onF#'));
      console.log(Music.Chord.inputToSign('c'));
      console.log(Music.Chord.inputToSign('csm7onff'));
      console.log(Music.Chord.signToInput('C#m7(#11,♭13)'));

    } catch (e) {
      ErrorHandle.send(e);
    }
  }

}

export = IndexController
