'use strict';
const os = require('os');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const execSync = require('child_process').execSync;

const pkg = require('../package.json');

let testConfig = {};

try {
  testConfig = require('../config/config_test');
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('no test config set');
}

let hcJson = {
  common: {},
  apps: {
    [pkg.name]: {}
  }
};

const appName = pkg.name;
try {
  hcJson = require(path.join(os.homedir(), '.honeycomb.json'));
} catch (e) {
  e;
}


const appConfig = hcJson.apps[appName];
const commonConfig = hcJson.common;

process.env.HC_APP_CONFIG = JSON.stringify({
  serverRoot: '',
  appRoot: path.join(__dirname, '../'),
  config: _.merge({}, commonConfig, appConfig, testConfig),
  env: 'dev'
});

const genAutoRouter = () => {
  const appRoot = process.cwd();
  const ctrlPath = path.join(appRoot, './controller');
  let cmd = JSON.stringify(process.argv[0]) +
  ' ' + path.resolve(require.resolve('api-annotation'), '../bin/api-annotation.js');

  if (!fs.existsSync(ctrlPath)) {
    console.log('[WARN] controller dir not fould, ignore gen auto_router'); // eslint-disable-line

    return;
  }

  cmd += ' -o ' + path.join(appRoot, './auto_router.js');
  cmd += ' ' + ctrlPath;
  const res = execSync(cmd, {
    cwd: appRoot,
    timeout: 10000
  }).toString();

  if (/ERROR/.test(res)) {
    console.error('gen_auto_router_failed:', res); // eslint-disable-line
    throw res;
  }
};

genAutoRouter();

module.exports = require('../app');
