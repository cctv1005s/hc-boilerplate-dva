'use strict';

module.exports = {
  debug: false,
  logs: {
    sys: {
      level: 'INFO',
      file: '${serverRoot}/logs/${appName}/query.%year%-%month%-%day%.log',
      rotation: 30
    }
  },
  middleware: {
  }
};
