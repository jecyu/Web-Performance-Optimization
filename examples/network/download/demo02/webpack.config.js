const path = require("path");
module.exports = {
  entry: "./main.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "./dist"),
  },
  // mode: "development",
  mode: "production",
  optimization: {
    usedExports: true,
  },
};
