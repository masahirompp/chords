/// <reference path="../tsd/tsd.d.ts" />

import express = require('express');

class Logger {

  static init(config: any, app: express.Application): any {

    var log4js: any = require('log4js');
    log4js.configure('config/log4js_setting.json');
    var logger = log4js.getLogger('app');
    logger.setLevel(config.log.level); // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
    logger.info('Logging start. ');
    logger.info('Log Level:' + config.log.level);
    app.use(log4js.connectLogger(logger, {
      level: config.log.level
    }));

    return logger;
  }

}

export = Logger