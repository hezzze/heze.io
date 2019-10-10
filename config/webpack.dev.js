const path = require('path');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  // debug: true, //TODO: figure out what this means
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './build'),

    // Public this would affect the script tags
    // generated by HtmlWebpackPlugin
    // file paths will be prefixed by the path defined here
    // it should be the designated path for static assets
    publicPath: '/',

    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin('[name].css')
  ],
  devtool: 'cheap-module-source-map',
  devServer: {

    // this is the endpoint where the webpack static/bundle assets
    // will be served, by default it's '/'
    host: '0.0.0.0',
    // contentBase: 'build',
    publicPath: '/',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'minimal',
    inline: true,
    port: 8089
  }
});
