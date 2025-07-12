const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    vendors: ['react', './src/vendors.js', 'lodash', 'moment'],

    app: ['./src/main.jsx']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, '../node_modules'), 'build'],
    alias: {
      // lib: path.join(__dirname, '../src/js/lib'),
      // actions: path.join(__dirname, '../src/js/actions'),
      // components: path.join(__dirname, '../src/js/components')
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['last 2 versions', 'safari >= 7']
            },
            useBuiltIns: 'entry',
            corejs: 3
          }],
          ['@babel/preset-react', {
            runtime: 'automatic'
          }]
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-regenerator'

          // importing css automatically from npm package
          // ['import', { libraryName: 'antd-mobile', style: 'css' }]
          // `style: true` for less
        ]
      },
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          api: 'modern',
          sassOptions: {
            includePaths: ['node_modules', path.resolve(__dirname, '../src/styles')]
          }
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/[name].[hash][ext]'
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      // $: 'jquery',
      _: 'lodash',
      PropTypes: 'prop-types',
      moment: 'moment'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/hz.ico'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    })
  ]
};
