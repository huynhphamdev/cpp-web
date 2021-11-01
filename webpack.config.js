const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    publicPath: '/',
  },

  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || 3001,
    open: true,
    inline: true,
    hot: true,
    hotOnly: true,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __ENV__: `'${process.env.ENV}'`,
    }),
    new HtmlWebpackPlugin({
      title: 'Hỗ trợ học lập trình C++',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: './',
        globOptions: {
          ignore: [
            '**/index.html',
          ],
        },
      }],
    }),
  ],
}
