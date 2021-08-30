const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  // 指定构建模式，可选值有 development 和 production
  // development => 开发过程中使用, 追求打包速度而不是打包体积
  // production => 发布过程中使用, 追求打包体积而不是打包速度
  mode: "development",

  // eval-source-map 仅限在"开发模式"下使用, "生产模式"建议注释掉
  // 此选项生成的 Source Map 能够保证"运行时报错的行数"与"源代码的行数"保持一致
  devtool: "eval-source-map",

  // 只定位行数不暴露源码, 会以.js.map后缀名出现在build之后的包内
  // devtool: "nosources-source-map",
  plugins: [
    htmlPlugin,
    // 清除dist
    new CleanWebpackPlugin(),
  ],
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/bundle.js",
  },

  devServer: {
    open: true,
    host: "127.0.0.1",
    port: "8000",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // {
      //   test: /\.jpg|png|gif$/,
      //   // limit表示字节大小,
      //   // 如果图片大于limit值, 在dev环境下不会被转成base64, 小于limit值的图片会被转成base64
      //   // build的时候小于limit值的图片会被打包进outputPath文件夹中, 大于limit值的图片会被转成base64放到js文件里
      //   use: "url-loader?limit=10&outputPath=images",
      // },
      {
        test: /\.jpg|png|gif$/,
        // limit表示字节大小, 如果图片大于limit值, 是不会被转成base64
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              outputPath: "image",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      // 配置路径别名
      "@": path.join(__dirname, "./src"),
    },
  },
};
