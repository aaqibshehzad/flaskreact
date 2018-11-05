const HtmlWebPackPlugin = require("html-webpack-plugin");
const config = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "js/bundle.js",
    publicPath: "/dist"
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
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/public/index.html"
    })
  ]
};
module.exports = config;
