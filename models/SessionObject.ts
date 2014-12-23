/// <reference path="../tsd/tsd.d.ts" />

import passport = require('passport');
import User = require('./User');

class SessionObject {

  constructor(public id: string, public account: string, public name: string, public image: string, public profile? : passport.Profile) {}

  /**
   * ログイン済みか？
   * @returns {boolean}
   */
  get isLogined() {
    return !!this.id;
  }

  /**
   * Profilekからセッションオブジェクト生成。未登録の場合に使用する。
   * @param profile
   * @returns {SessionObject}
   */
  static makeFromProfile(profile: passport.Profile): SessionObject {
    return new SessionObject(null, profile.id, profile.displayName, User.ICON.IDENTICON, profile);
  }

  /**
   * Userからセッションオブジェクトを生成する。登録済みの場合に使用する。
   * @param user
   * @returns {SessionObject}
   */
  static makeFromUser(user: User): SessionObject {
    return new SessionObject(user._id, user.account, user.name, user.image);
  }
}

export = SessionObject;
