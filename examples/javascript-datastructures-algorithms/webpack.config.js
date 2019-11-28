const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env;

let libraryName = 'PackDataStructuresAlogrithms';
let plugins = [];
let outputFile = "";

if (env === 'build') {
  // plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js'
}

const config = {
  mode: "development",
  entry: __dirname + '/src/js/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/examples', // 打包文件的输出目录
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)|bower_components/
      }
    ]
  }
}

module.exports =  config;