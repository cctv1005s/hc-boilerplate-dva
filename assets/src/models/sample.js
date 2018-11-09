import request from 'superagent';
import _ from 'lodash';

export default {

  namespace: 'sample',

  state: {
    data: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield request(window.CONFIG.prefix + '/api/sample');
      const data = _.get(result, 'body.data');
      yield put({
        type: 'save',
        payload: {
          data: data
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
