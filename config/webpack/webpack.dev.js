const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => require('./webpack.base')({
  entry: ['idempotent-babel-polyfill', path.resolve(process.cwd(), 'src/main.js')],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'dice.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(process.cwd(), 'src'),
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-react-constant-elements',
            '@babel/plugin-transform-react-inline-elements',
            'dynamic-import-node',
          ],
        },
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
  ],
  devtool: 'eval-source-map',
});
