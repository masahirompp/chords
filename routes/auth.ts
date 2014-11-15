/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');

class Auth {

  static init(passport: passport.Passport): express.Router {

    var router: express.Router = express.Router();

    router.get('/signup', (req: express.Request, res: express.Response) => {
      res.render('signup', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: ''
      });
    });

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/auth/signup'
      }));

    return router;
  }
}

export = Auth;
