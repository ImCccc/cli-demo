const { version } = require("../package.json");

const downloadDirectory = (process.env.HOME || process.env.USERPROFILE) + "\\.clitemplate";

module.exports = {
  version,
  downloadDirectory
};
