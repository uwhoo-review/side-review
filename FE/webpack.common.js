const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const env = require("./env");

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
    }),
    new CleanWebpackPlugin(),
  ],
};
