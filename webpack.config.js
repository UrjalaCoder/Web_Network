const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

const client = {
  entry: "./src/client/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

const server = {
  entry: "./src/server.js",
  mode: "development",
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  output: {
    path: path.join(__dirname, "/"),
    publicPath: __dirname,
    filename: "server-bundle.js"
  },
  node: {
    __filename: true,
    __dirname: false,
  },
}


module.exports = [client, server];
