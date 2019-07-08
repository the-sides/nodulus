const path = require('path');

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  }
};