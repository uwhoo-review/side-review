const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: ReactRefreshTypeScript,
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer dart-sass
              implementation: require.resolve("sass"),
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|mp3|ogg|wav|ico|otf|ttf|woff|woff2)$/,
        type: "asset/resource", // use the asset/resource type to fetch the files
        generator: {
          filename: "[name][ext][query]", // customize the output filename here
        },
        // use: [
        //   {
        //     loader: "file-loader",
        //   },
        // ],
      },
      {
        test: /\.css$/ ,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
          },
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024, // 8kb
              fallback: "file-loader",
              name: "[name].[ext]",
            },
          },
        ],
      }
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});
