const fs = require("fs");
const os = require("os");
const path = require("path");
const inquirer = require("inquirer");
const { assert } = require("chai");
const glob = require("glob");
const AutoDeployWebpackPlugin = require("../src");

const getIPAddress = () => {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
};

let ip = getIPAddress();
let { username, homedir } = os.userInfo();

const question = [
  {
    type: "password",
    message: "Please enter your password:",
    name: "pwd",
    default: ""
  }
];

describe("upload dir test case", function () {
  describe("Upload a folder to the specified directory", function () {
    it("The specified directory exists", async function () {
      try {
        let answer = await inquirer.prompt(question);
        let homePathLength = homedir.length;
        let localPath = process.cwd() + "/src";
        let serverPath = process.cwd().substring(homePathLength + 1) + "/test/server";
        const autoInstance = new AutoDeployWebpackPlugin({
          serverOptions: {
            host: ip,
            username,
            password: answer.pwd
          },
          localPath,
          serverPath
        });
        await autoInstance.uploadDir();
        let isDir = fs.existsSync(path.resolve(process.cwd(), "test/server"));
        assert.ok(isDir, "存在");
      } catch (error) {
        done(error);
      }
    });
    it("The number of files in the specified path is the same as that in the local path", function () {
      let localPathFilesNum = glob.sync("src/*").length;
      let serverPathFilesNum = glob.sync("test/server/*").length;
      assert.equal(localPathFilesNum, serverPathFilesNum);
    });
  });
});
