"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

let config = {
  devtool: "source-map",
  debug: true,
  failOnError:  true,

  entry: [ "./src/App.js"],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.[hash].js",
    publicPath: "/",
    sourceMapFilename: "[file].map"
  },

  resolve: {
    extensions: ["", ".js"]
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: "babel?cacheDirectory", exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // new ExtractTextPlugin("styles.[hash].css"),
    new HtmlWebpackPlugin({
      title: "React TV",
      template: "./src/index.html",
      inject: "body",
      hash: true
    })
  ],

};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = config;

