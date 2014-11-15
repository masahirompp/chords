/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import Author = require('../model/Author');

class Auth {

  static init(passport: passport.Passport): express.Router {

    var router: express.Router = express.Router();

    router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    router.get('/register', (req: express.Request, res: express.Response) => {
      res.render('register', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
      passport.authenticate('twitter', {
        failureRedirect: '/'
      }), (req: express.Request, res: express.Response) => {
        console.log(req.user);
        Author.getById(req.user.authorId)
          .then(author => {
            if (author) {
              return res.redirect('/');
            }
            res.redirect('/auth/register');
          });
      });

    return router;
  }
}

export = Auth;
