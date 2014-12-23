/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import session = require('express-session');
import User = require('../models/User');
import SessionObject = require('../models/SessionObject');
import util = require('../util/Util');

class AuthUtil {

  static init(config: any, mongoose: any, app: express.Application) {

    // passport
    var TwitterStrategy = require('passport-twitter')
      .Strategy;
    passport.use(new TwitterStrategy({
      consumerKey: config.auth.twitter.TWITTER_CONSUMER_KEY,
      consumerSecret: config.auth.twitter.TWITTER_CONSUMER_SECRET,
      callbackURL: config.auth.twitter.callbackURL
    }, (token, tokenSecret, profile, done) => {
      process.nextTick(() => {
        // profileからUserを生成。
        User.findByTwitter(profile)
          .then(user => {
            // 必要に応じてイメージを更新
            return user.isValid ? user.updateImage(profile) : user
          })
          .then(user => done(null,
            // セッションオブジェクトを作る
            user.isValid ?
            SessionObject.makeFromUser(user) :
            SessionObject.makeFromProfile(profile)))
          .catch(err => done(err));
      });
    }));

    passport.serializeUser((sessionObject, done) => done(null, sessionObject));
    passport.deserializeUser((sessionObject, done) => done(null, sessionObject));

    // session
    app.use(session({
      secret: config.server.session,
      store: require('mongoose-session')(mongoose),
      cookie: {
        httpOnly: false,
        maxAge: 60 * 60 * 1000
      },
      resave: true,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // middleware
    app.use((req, res, next) => {
      var url = req.url + '/';

      if (req.isAuthenticated() && req.user.isLogined) {
        // 認証済み＆ログイン済みの場合
        // 再度登録処理を行う場合（不正アクセス）、トップへリダイレクトする。
        if (util.startsWith(url, '/register/')) {
          return res.redirect('/');
        }
      } else {
        // 未ログインの場合
        // 認証領域へのアクセスで、匿名アクセスの場合、ログイン画面へリダイレクト
        if (util.startsWith(url, '/works/') || util.startsWith(url, '/api/works/')) {
          res.cookie('redirectUrl', req.url);
          return res.redirect('/auth/login');
        }
      }

      next();
    });

    return passport;
  }

}

export = AuthUtil