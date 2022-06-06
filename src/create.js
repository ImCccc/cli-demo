const fs = require("fs");
const ora = require("ora");
const path = require("path");
const inquirer = require("inquirer");
const { promisify } = require("util");
const npc = promisify(require("ncp"));
const { downloadDirectory } = require("./constants");
const downloadGitRepo = promisify(require("download-git-repo"));

const metalsmith = require("metalsmith");
const { render } = require("consolidate").handlebars;

const waitLoading =
  (fn, text) =>
  async (...args) => {
    const spinner = ora(text || "loading...").start();
    try {
      await fn(...args);
      spinner.succeed();
    } catch (error) {
      spinner.fail();
    }
  };

module.exports = async (args) => {
  let { temp } = await inquirer.prompt([
    {
      type: "list",
      name: "temp",
      message: "选择模板:",
      choices: ["后台模板1:lic-test", "后台模板2:lic-test1"],
    },
  ]);
  const repo = temp.split(":")[1];
  const projectName = args[0];
  const downloadAddress = `${downloadDirectory}/${repo}`;

  if (!fs.existsSync(downloadAddress)) {
    await waitLoading(downloadGitRepo, "加载模板.......")(
      "github:ImCccc/" + repo,
      downloadAddress
    );
  }

  const askPath = path.join(downloadAddress, "ask.js");

  if (!fs.existsSync(askPath)) {
    return npc(downloadAddress, path.resolve(projectName));
  }

  metalsmith(__dirname)
    .source(downloadAddress)
    .destination(path.resolve(projectName))
    .use(async (files, metal, done) => {
      const args = require(path.join(downloadAddress, "ask.js"));
      let answer = await inquirer.prompt(args);
      const meta = metal.metadata();
      Object.assign(meta, answer);
      done();
    })
    .use((files, metal, done) => {
      delete files["ask.js"];
      Reflect.ownKeys(files).forEach(async (file) => {
        if (file.includes(".js") || file.includes(".json")) {
          let content = files[file].contents.toString();
          if (content.includes("{{")) {
            content = await render(content, metal.metadata());
            files[file].contents = Buffer.from(content);
          }
        }
      });
      done();
    })
    .build((err) => {
      if (err) console.log(err);
    });
};
