# auto-deploy-webpack-plugin

Upload your packaged folder to the specified path on the server

# Installation

Install with npm

```shell
npm install @handsomezyw/auto-deploy-webpack-plugin
```

# Usage

```js
const AutoDeployWebpackPlugin = require("@zyw/auto-deploy-webpack-plugin");

const options = {
  serverOptions: {
    username: "administrator",
    host: "xxx.xx.x.xxx",
    password: "123456"
  },
  localPath: "/Users/xx/Desktop/demo/dist",
  serverPath: "Desktop/project/public"
};

// webpack.config.js
module.exports = {
  plugins: [new AutoDeployWebpackPlugin(options)]
};

```

# options

- `serverOptions` `{ object }` connect to the SSH configuration of the server
  
  - `username` `{ string }` your server username
  
  - `password` `{ string }` your server password
  
  - `host` `{ string }` your server ip
  
  - `privateKey` `{ string }` your privateKey

- `localPath` local folder path

- `serverPath` server folder path






