const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  plugins: [],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "autoDeploy-webpack-plugin.js",
    globalObject: 'this',
    library: {
      name: "autoDeployWebpackPlugin",
      type: "umd"
    },
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  externals: {
    "schema-utils": "commonjs schema-utils",
    "ssh2-sftp-client": "commonjs ssh2-sftp-client"
  }
};
