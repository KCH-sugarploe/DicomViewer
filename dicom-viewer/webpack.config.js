const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    fallback: {
      "fs": false,
      "path": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("@tailwindcss/postcss"),
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};