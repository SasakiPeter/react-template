import type { Configuration } from "webpack";
import type { Configuration as DevConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve } from "path";

const isProduction = process.env.NODE_ENV === "production";

declare module "webpack" {
  interface Configuration {
    devServer?: DevConfiguration;
  }
}

const config: Configuration = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: resolve(__dirname, "src", "index.tsx"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
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
              configFile: resolve(__dirname, "src", "tsconfig.json"),
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
      template: resolve(__dirname, "src", "index.html"),
    }),
  ],
};

export default config;
