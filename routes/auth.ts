/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import Author = require('../models/Author');
import User = require('../models/User');

class Auth {

  static init(passport: passport.Passport): express.Router {

    var router: express.Router = express.Router();

    router.get('/logout', (req, res) => {
      req.logout();
      req.flash('message_success', 'ログアウトしました。');
      res.redirect('/');
    });

    router.get('/login', (req, res) => {
      res.render('login', {
        title: 'ログイン | コード譜共有サイト ChordKitchen',
        message_warning: '「http://' + req.host + req.cookies.redirectUrl + '」にアクセスするためには、ログインする必要があります。'
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
      Author.create(req.param('displayName'), req.param('email'))
        .then(author => {
          return User.relateAuthor(req.user._id, author.id);
        })
        .then(user => {
          // リダイレクト先が指定されていれば、リダイレクト
          var redirectUrl = req.cookies.redirectUrl;
          if (redirectUrl) {
            res.clearCookie('redirectUrl');
            return res.redirect(decodeURIComponent(redirectUrl))
          }
          // リダイレクト先が指定されていない場合は、トップ画面へリダイレクト
          req.flash('message_success', 'ユーザ登録ありがとうございます。ChordKitchenをお楽しみください。');
          res.redirect('/');
        })
        .catch(err => {
          req.flash('message_warning', err);
          res.redirect('/auth/register');
        });
    });

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
      passport.authenticate('twitter', {
        failureRedirect: '/'
      }), (req: express.Request, res: express.Response) => {
        Author.findById(req.user.authorId)
          .then(author => {
            // ユーザ登録済みの場合
            if (author) {
              // リダイレクト先が指定されていれば、リダイレクト
              var redirectUrl = req.cookies.redirectUrl;
              if (redirectUrl) {
                res.clearCookie('redirectUrl');
                return res.redirect(decodeURIComponent(redirectUrl))
              }
              // リダイレクト先が指定されていない場合は、トップ画面を表示。
              req.flash('message_success', 'ログインしました。');
              res.redirect('/');
            }

            // ユーザ未登録の場合は登録画面へ
            res.redirect('/auth/register');
          });
      });

    return router;
  }
}

export = Auth;
