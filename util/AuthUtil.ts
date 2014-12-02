/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');
import passport = require('passport');
import session = require('express-session');
import User = require('../model/User');

class AuthUtil {

  static init(config: any, app: express.Application) {
    // passport
    var TwitterStrategy = require('passport-twitter')
      .Strategy;
    passport.use(new TwitterStrategy({
      consumerKey: config.auth.twitter.TWITTER_CONSUMER_KEY,
      consumerSecret: config.auth.twitter.TWITTER_CONSUMER_SECRET,
      callbackURL: config.auth.twitter.callbackURL
    }, (token, tokenSecret, profile, done) => {
      User.findOrCreate(profile)
        .then(user => done(null, user))
        .catch(err => done(err));
    }));

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser((id, done) => {
      User.findById(id)
        .then(user => done(null, user))
        .fail(err => done(err, null));
    });

    var MongoStore: any = require('connect-mongo')(session);

    app.use(session({
      secret: config.server.session,
      store: new MongoStore({
        db: config.db.name,
        host: config.db.host,
        clear_interval: 60 * 60
      }),
      cookie: {
        httpOnly: false,
        maxAge: Date.now() + 60 * 60 * 1000
      },
      resave: true,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // 認証領域へのアクセスで、匿名アクセスの場合、リダイレクト
    app.use((req, res, next) => {
      var url = req.url + '/';
      if (url.lastIndexOf('/mypage/', 0) === 0 || url.lastIndexOf('/edit/', 0) === 0) {
        if (req.isUnauthenticated()) {
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
