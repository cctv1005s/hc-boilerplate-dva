/**
 * 样例返回, 1s后返回
 * @api {get} /api/sample
 */
exports.sample = (req, cb) => {
  setTimeout(() => {
    cb(null, 'hello');
  }, 1000);
};
