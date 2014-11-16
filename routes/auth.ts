/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import Author = require('../model/Author');
import User = require('../model/User');

class Auth {

  static init(passport: passport.Passport): express.Router {

    var router: express.Router = express.Router();

    router.get('/logout', function(req, res) {
      req.logout();
      res.render('index', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user,
        message_success: 'ログアウトしました。'
      });
    });

    router.get('/register', (req: express.Request, res: express.Response) => {
      res.render('register', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user
      });
    });

    router.post('/register', (req: express.Request, res: express.Response) => {
      Author.createNewAuthor(req.param('displayName'), req.param('email'))
        .then(author => {
          console.log('author');
          console.log(author);
          return User.relateAuthor(req.user._id, author.id);
        })
        .then(user => {
          console.log('user');
          console.log(user);
          res.render('index', {
            title: 'コード譜共有サイト ChordKitchen',
            keyword: '',
            user: user,
            message_success: 'ユーザ登録ありがとうございます。ChordKitchenをお楽しみください。'
          });
        })
        .fail(err => {
          console.log(err);
          res.redirect('/auth/register');
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
              res.render('index', {
                title: 'コード譜共有サイト ChordKitchen',
                keyword: '',
                user: req.user,
                message_success: 'ログインしました。'
              });
            }
            res.redirect('/auth/register');
          });
      });

    return router;
  }
}

export = Auth;
