const path = require("path");
const Mocha = require("mocha");

const mocha = new Mocha({
  timeout: 1000 * 60
});

mocha.addFile(path.resolve(__dirname, "upload-dir.test.js"));
mocha.run();
