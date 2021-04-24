import { TransformOptions, ConfigAPI } from "@babel/core";

export default function (api: ConfigAPI): TransformOptions {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
      ["@babel/preset-react"],
    ],
  };
}
