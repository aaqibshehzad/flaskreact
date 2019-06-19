const webpack = require("webpack");
const path = require("path");
const commonConfig = require("./webpack.config.common");
const configMerge = require("webpack-merge");

const build_dir = "../../api/static";

const BUILD_DIR = path.resolve(__dirname, build_dir);

process.env.NODE_ENV = "development";
process.env.DEBUG = true;

module.exports = configMerge(commonConfig, {
  mode: "development",
  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
    compress: true,
    port: 8080
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
