const path = require('path');

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'dice.js',
    },
    options.output
  ),
  module: {
    rules: options.module.rules,
  },
  plugins: options.plugins || {},
  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'src/components'),
    ],
    extensions: ['.js', '.jsx', '.react.js'],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
});
