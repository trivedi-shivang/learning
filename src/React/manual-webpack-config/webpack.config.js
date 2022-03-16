var path = require("path");

module.exports = {
  entry: "./index.js", //tells where to start creating dependency-graph.
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js", //stores the bundle code in bundle.js
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }], // runs the loader on all .js files excluding those that are found in "node_modules"
  },
  devtool: "#source-map", //allows to debug original source files. Without this option, it is difficult to navigate bundle.js
};
