const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};