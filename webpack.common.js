/**
 * Shared Webpack Config
 */

const site = require('./data/site.json'); // @TODO: option use ajax call to grab site info for build
const path = require('path');
const webpack = require('webpack');
//const isProd = process.env.NODE_ENV === 'production'; // Currently unused

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'app-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      // Styles
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true || { discardComments: { removeAll: true } }}
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },

  // Plugins
  // - configure optimizations in environment-specific configs, not here
  // - define environment variables here from 'site' JSON
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app-[hash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: site.siteName,
      template: 'src/index.html',
      minify: {removeComments: true, collapseWhitespace: true, conservativeCollapse: true}
    }),
    new CopyWebpackPlugin([
      { from: './src/public/fonts', to: './fonts' },
      { from: './src/public/images', to: './images' }
    ]),
    new webpack.DefinePlugin({
      'process.env.SITENAME': JSON.stringify(site.siteName),
      'process.env.CONSOLE_GREETING': JSON.stringify(site.consoleGreeting)
    })
  ]

};