'use strict';
const assert = require('power-assert');
const request = require('supertest');
const app = require('./env');


const prefix = app.config.prefix;

describe('test_ctrl.js', () => {
  describe('# welcomeTpl', () => {
    it(`get ${app.config.prefix} should response data`, (done) => {
      request(app.express)
        .get(prefix)
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(done);
    });

    it(`get sample should response hello`, (done) => {
      request(app.express)
        .get(prefix + '/api/sample')
        .expect(200)
        .then(d => {
          assert(d.body.code === 'SUCCESS');
          assert(d.body.data === 'hello');
        }).then(done);
    });
  });
});
