/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import User = require('../models/User');
import SessionObject = require('../models/SessionObject');

class Auth {

  static init(passport: passport.Passport): express.Router {

    var router: express.Router = express.Router();

    /**
     * ログアウト
     */
    router.get('/logout', (req, res) => {
      req.logout();
      req.flash('message_success', 'ログアウトしました。');
      res.redirect('/');
    });

    /**
     * ログイン（未ログインで認証領域へアクセスした場合にこのルートにくる）
     */
    router.get('/login', (req, res) => {
      res.render('login', {
        title: 'ログイン | コード譜共有サイト ChordKitchen',
        message_warning: '「http://' + req.host + req.cookies.redirectUrl + '」にアクセスするためには、ログインする必要があります。'
      });
    });

    /**
     * 登録画面表示
     */
    router.get('/register', (req: express.Request, res: express.Response) => {
      res.render('register', {
        title: 'コード譜共有サイト ChordKitchen',
        keyword: '',
        user: req.user,
        message_success: req.flash('message_success'),
        message_warning: req.flash('message_warning')
      });
    });

    /**
     * 登録処理
     */
    router.post('/register', (req: express.Request, res: express.Response) => {
      User.create(req.body.account, req.body.name, req.body.email, req.user.profile)
        .then(user => {
          // セッションを書き換える
          req.login(user, err => {
            req.flash('message_warning', err.toString());
            return res.redirect('/auth/register');
          });

          process.nextTick(() => {
            // リダイレクト先が指定されていれば、リダイレクト
            var redirectUrl = req.cookies.redirectUrl;
            if (redirectUrl) {
              res.clearCookie('redirectUrl');
              return res.redirect(decodeURIComponent(redirectUrl))
            }
            // リダイレクト先が指定されていない場合は、トップ画面へリダイレクト
            req.flash('message_success', 'ユーザ登録ありがとうございます。ChordKitchenをお楽しみください。');
            res.redirect('/');
          });
        })
        .catch(err => {
          req.flash('message_warning', err.toString());
          res.redirect('/auth/register');
        });
    });

    /**
     * twitterログイン処理
     */
    router.get('/twitter', passport.authenticate('twitter'));

    /**
     * twitter認証後のコールバック
     */
    router.get('/twitter/callback',
      passport.authenticate('twitter', {
        failureRedirect: '/'
      }), (req: express.Request, res: express.Response) => {
        // ユーザ未登録の場合は、登録画面へ
        if (!req.user.logined) return res.redirect('/auth/register');

        // ログイン成功して、リダイレクト先が指定されていれば、リダイレクト
        var redirectUrl = req.cookies.redirectUrl;
        if (redirectUrl) {
          res.clearCookie('redirectUrl');
          return res.redirect(decodeURIComponent(redirectUrl))
        }
        // リダイレクト先が指定されていない場合は、トップ画面を表示。
        req.flash('message_success', 'ログインしました。');
        res.redirect('/');
      });

    return router;
  }
}

export = Auth;
