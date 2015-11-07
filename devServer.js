#!/usr/bin/env node

require("babel-core/register");

if (process.env.NODE_ENV === undefined) {
  throw new Error("NODE_ENV is undefined");
}

const path = require("path");
const express = require("express");
const webpack = require("webpack");
const config = require("./webpack.config.js");
const app = express();

config.devtool = "eval";
config.output.filename = "bundle.js"
config.entry.unshift("webpack-hot-middleware/client");
config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

const compiler = webpack(config);

const devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
})

app.use(this.middleware = devMiddleware);

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  var index = this.middleware.fileSystem.readFileSync(path.join(config.output.path, "index.html"));
  res.end(index);
}.bind(this));

app.listen(8091, "localhost", function(err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log("Listening at http://localhost:8091"); // eslint-disable-line no-console
});

