/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import Author = require('../model/Author');

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
        failureRedirect: '/'
      }), (req: express.Request, res: express.Response) => {
        console.log(req.user);
        Author.getById(req.user._id).then(author => {
          if(author){
            return res.redirect('/');
          }
          res.redirect('/auth/signup');
        });
      });

    return router;
  }
}

export = Auth;
