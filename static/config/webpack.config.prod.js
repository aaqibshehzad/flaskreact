const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const commonConfig = require("./webpack.config.common");
const configMerge = require("webpack-merge");
const path = require("path");

const build_dir = "../../api/static";

const BUILD_DIR = path.resolve(__dirname, build_dir);

process.env.NODE_ENV = "production";
process.env.DEBUG = false;

module.exports = configMerge(commonConfig, {
  mode: "production",
  optimization: {
    nodeEnv: "production",
    minimize: true,
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
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
          ie8: false
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(build_dir, { allowExternal: true }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
});
