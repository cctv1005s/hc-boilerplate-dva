const app = require('./env');

before(() => {
  app.run(() => {}, {port: 0});
});

require('./test_ctrl.test');

after(() => {
  // 框架要输出日志信息
  setTimeout(() => {
    process.exit();
  }, 1000);
});
