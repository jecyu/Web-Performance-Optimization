const path = require("path");
module.exports = {
  entry: "./main.js",
  devServer: {

  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js', // 动态生成
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "development",
//   mode: "production",
  optimization: {
    usedExports: true,
  },
};
