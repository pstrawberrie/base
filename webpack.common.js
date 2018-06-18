/**
 * Shared Webpack Config
 */

const site = require('./data/site.json'); // @TODO: can we use ajax call to grab site info for build?
const path = require('path');
//const isProd = process.env.NODE_ENV === 'production'; // Currently unused

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      },
      // Images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  // Plugins
  // - configuring optimizations in environment-specific configs
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app-[hash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      title: site.title,
      minify: {removeComments: true, collapseWhitespace: true, conservativeCollapse: true}
    })
  ]

};