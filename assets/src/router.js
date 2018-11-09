import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import PropTypes from 'prop-types';
import Sample from './routes/sample';

import Layout from './routes/layout/index';


function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" exact component={Sample} />
        </Switch>
      </Layout>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object
};

export default RouterConfig;
