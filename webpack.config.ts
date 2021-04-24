const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: resolve("src", "index.tsx"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    port: "3000",
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: isProduction
                  ? "[hash:base64:16]"
                  : "[path][name]_[local]",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: isProduction,
      template: resolve("src", "index.html"),
    }),
  ],
};
