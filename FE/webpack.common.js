const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@res": path.resolve(__dirname, "res"),
      "@src": path.resolve(__dirname, "src"),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "./index.html",
      favicon: path.resolve(__dirname, "public/favicon_16x16.ico")
    }),
    new CleanWebpackPlugin(),
  ].concat(process.env.NODE_ENV === "development" ? [new Dotenv({path: ".env.development"})] : [new Dotenv({path: ".env.production"})]),
};
