const CleanWebpackPlugin = require("clean-webpack-plugin");
const configMerge = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const webpack = require("webpack");
const path = require("path");

const build_dir = "../../api/static";

const BUILD_DIR = path.resolve(__dirname, build_dir);

process.env.NODE_ENV = "development";
process.env.DEBUG = true;

module.exports = configMerge(commonConfig, {
  mode: "development",
  optimization: {
    nodeEnv: "development",
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 3,
          maxInitialRequests: 6,
          maxAsyncRequests: 6
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(build_dir, { allowExternal: true }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
