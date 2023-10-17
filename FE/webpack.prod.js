const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const TerserPlugin = require("terser-webpack-plugin");
// const VersionWebpackPlugin = require("./VersionWebpackPlugin");
// const CheckMemoryUsagePlugin = require("./CheckMemoryUsagePlugin.js");

const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
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
              // getCustomTransformers: () => ({
              //   before: ReactRefreshTypeScript,
              // }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/ ,
        use: ["style-loader", "css-loader"],
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
        type: "javascript/auto", // use the asset/resource type to fetch the files
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024, // 8kb
              fallback: {
                loader: "file-loader",
                options: {
                  esModule: false,
                  name: "[path][hash].[ext]?[query]",
                },
              },
            },
          },
        ],
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
              fallback: {
                loader: "file-loader",
                options: {
                  esModule: false,
                  name: "static/media/[name][contenthash:8].[ext]",
                },
              },
            },
          },
        ],
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: "all",
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
    ],
  },

});
