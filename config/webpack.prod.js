const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../build'),

    // NOTE: this will add prefix to the asset path
    // like: /app.js
    // publicPath: '/',
    filename: '[name].[fullhash].js'
  },

  optimization: {
    minimize: true
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ]
});
