const path = require("path");
var nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  entry: "./app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
