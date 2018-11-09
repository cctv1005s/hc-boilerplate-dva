import dva from 'dva';
import createLoading from 'dva-loading';
import 'babel-polyfill';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/sample'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#main');
