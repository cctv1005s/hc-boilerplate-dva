const path = require('path');

module.exports = {
  entry: {
    // 设置前端app的入口文件
    app: path.join(__dirname, 'src', 'index.js')
  },
  output: {
    // 设置前端打包的输出目录，修改此处会影响honeycomb package!!!
    path: path.join(__dirname, '.package')
  },
  module: {
    rules: [
      // 合并规则：根据test合并loaders，根据loader合并options
    ]
  },
  plugins: [
    // 合并规则：合并所有plugins，同名plugin只出现一次
  ],
  unPlugins: [
    // 字符串，表示要去掉的plugin，如'UglifyJsPlugin'
  ]
};
