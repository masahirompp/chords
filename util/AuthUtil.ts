import passport = require('passport');
import User = require('../model/User');

class AuthUtil {

  static init(config: any) {
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

    return passport;
  }

}

export = AuthUtil