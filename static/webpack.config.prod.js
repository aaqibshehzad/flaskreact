const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const CompressionPlugin = require("compression-webpack-plugin");
//const ChangeExtensionPlugin = require("change-extension-plugin");
const config = {
  mode: "production",
  entry: {
    index: __dirname + "/src/index.js"
    //page1: __dirname + "/src/Page1.js",
    //page2: __dirname + "/src/Page2.js",
    //page3: __dirname + "/src/Page3.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].bundle.js",
    publicPath: "/dist/"
  },
  optimization: {
    nodeEnv: "production",
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { minimize: true } }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "[name].[ext]",
            outputPath: "misc/"
          }
        }
      },
      // Image file loading (Optional)
      {
        test: /\.ico$/,
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
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              svgo: {
                cleanupAttrs: true,
                removeComments: true,
                removeEmptyAttrs: true,
                removeEmptyText: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    // Optional Compression Engine
    /*new CompressionPlugin({
			test: /\.(js|css)$/,
			filename: "[path].gz[query]",
			deleteOriginalAssets: true
		}),*/
    new HtmlWebPackPlugin({
      title: "Hello Flask React",
      template: "src/public/template.html",
      favicon: "src/public/favicon.ico",
      filename: "index.html",
      chunks: ["index", "commons"]
    })
    // Use this for multi-page app with routing handled by Flask
    /*new HtmlWebPackPlugin({
      title: "SymptomGuide Dementia",
      template: "src/public/template.html",
      favicon: "src/public/favicon.ico",
      filename: "page2.html",
      chunks: ["page1", "commons"]
    }),
    new HtmlWebPackPlugin({
      title: "SymptomGuide Dementia",
      template: "src/public/template.html",
      favicon: "src/public/favicon.ico",
      filename: "page3.html",
      chunks: ["page2", "commons"]
    }),
    new HtmlWebPackPlugin({
      title: "SymptomGuide Dementia",
      template: "src/public/template.html",
      favicon: "src/public/favicon.ico",
      filename: "page3.html",
      chunks: ["page3", "commons"]
    })*/
  ]
};
module.exports = config;
