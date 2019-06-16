'use strict';

module.exports = {
  debug: false,
  logs: {
    sys: {
      level: 'INFO',
      file: '${serverRoot}/logs/${appName}/sys.%year%-%month%-%day%.log',
      rotation: 30
    }
  },
  middleware: {
  }
};
