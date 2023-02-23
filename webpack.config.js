const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;

  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: "./index.pug",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "favicon.png"),
            to: path.resolve(__dirname, "public"),
          },
          {
            from: path.resolve(__dirname, "src/images"),
            to: path.resolve(__dirname, "public/images"),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
      new CleanWebpackPlugin(),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }

    return base;
  };

  return {
    target: "web",
    context: path.resolve(__dirname, "src"),
    entry: {
      main: "./index.js",
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: filename("js"),
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src", "core"),
      },
    },
    devServer: {
      port: "3000",
      open: true,
      hot: true,
      static: path.resolve(__dirname, "src"),
    },
    devtool: isDev ? "source-map" : false,
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(pug)$/,
          loader: "pug-loader",
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
              },
            },
          ],
        },
      ],
    },
  };
};
