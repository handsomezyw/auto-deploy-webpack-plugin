const { validate } = require("schema-utils");
const Client = require("ssh2-sftp-client");
const sftp = new Client();

// serverOptions schema
const schema = {
  type: "object",
  properties: {
    host: {
      description: "your ip address",
      type: "string"
    },
    username: {
      description: "your username",
      type: "string"
    },
    privateKeyPath: {
      description: "your privateKeyPath",
      type: "string"
    },
    password: {
      description: "your password",
      type: "string"
    }
  },
  additionalProperties: true
};

class AutoDeployWebpackPlugin {
  constructor(options) {
    validate(schema, options.serverOptions, {
      name: "AutoDeployWebpackPlugin",
      baseDataPath: "options"
    });
    this.options = options;
  }
  async uploadDir() {
    try {
      const { serverOptions, localPath, serverPath } = this.options;
      await sftp.connect(serverOptions);
      await sftp.chmod(serverPath.substring(0, serverPath.lastIndexOf("/")), "777");
      let check_dir = await sftp.exists(serverPath);
      if (check_dir) {
        await sftp.rmdir(serverPath, true);
      }
      sftp.on("upload", (info) => {
        console.log(`Uploaded ${info.source}`);
      });
      await sftp.uploadDir(localPath, serverPath);
    } catch (error) {
      console.error("error:", error);
      process.exit(1);
    } finally {
      await sftp.end();
    }
  }
  apply(compiler) {
    // Output asset to the output directory and then execute
    compiler.hooks.afterEmit.tap("AutoDeployWebpackPlugin", (compilation) => {
      this.uploadDir();
    });
  }
}

module.exports = AutoDeployWebpackPlugin;
