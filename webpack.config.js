const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: resolve("src", "index.js"),
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
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: isProduction,
      template: resolve("src", "index.html"),
    }),
  ],
};
