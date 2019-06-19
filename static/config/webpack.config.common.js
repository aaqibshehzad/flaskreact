const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const build_dir = "../../api/static";
const src_dir = "../src";

const SRC_DIR = path.resolve(__dirname, src_dir);
const BUILD_DIR = path.resolve(__dirname, build_dir);

const config = {
  entry: {
    //webview: path.join(SRC_DIR, "Webview.js"),
    //reportpage: path.join(SRC_DIR, "ReportPage.js"),
    index: path.join(SRC_DIR, "Index.js")
  },
  output: {
    path: BUILD_DIR,
    filename: "js/[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      "../../theme.config$": path.join(SRC_DIR, "styling/theme.config"),
      heading: path.resolve(SRC_DIR, "styling/heading.less")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["lodash"],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(less|css)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: { importLoaders: true, minimize: true }
          },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "[name].[ext]",
            outputPath: "misc/"
          }
        }
      },
      // Image file loading (Optional)
      {
        test: /\.(ico|txt)$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]),
    new HtmlWebPackPlugin({
      title: "Flask React",
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        "theme-color": "#317EFB"
        // Will generate: <meta name="theme-color" content="#4285f4">
      },
      template: "src/public/template.html",
      favicon: "src/public/favicon.ico",
      filename: "index.html",
      chunks: ["index", "commons"]
    })
  ]
};
module.exports = config;
