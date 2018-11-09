import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Spin} from 'antd';

class Sample extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    sample: PropTypes.object,
    loading: PropTypes.object
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'sample/fetch'
    });
  }

  render() {
    const {
      loading,
      sample
    } = this.props;
    return (
      <div>
        I am loading something from server
        <Spin spinning={loading.effects['sample/fetch']}>
          {sample.data}
        </Spin>
      </div>
    );
  }
}

export default connect((state) => {
  return {sample: state.sample, loading: state.loading};
})(Sample);
