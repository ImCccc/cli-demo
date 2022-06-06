const { version } = require("./constants");
const program = require("commander");
const path = require("path");

// 所有参数指令列表
const mapActions = [
  {
    command: "create",
    alias: "c",
    description: "新建项目",
    examples: ["bb create <project-name>"],
  },
  {
    command: "config",
    alias: "conf",
    description: "配置项目",
    examples: ["bb config set <key> <value>", "bb config get <key>"],
  },
  {
    command: "*",
    description: "command not find",
    examples: [],
  },
];

mapActions.forEach((options) => {
  program
    .command(options.command)
    .alias(options.alias || "")
    .description(options.description || "")
    .action(() => {
      if (options.command === "*") return console.log(options.description);
      try {
        const actionPath = path.resolve(__dirname, options.command);
        /*
          __dirname:  C:\Users\licr1\Desktop\bb\src\
          path.resolve(__dirname, 'create'):  C:\Users\licr1\Desktop\bb\src\create
        */
        let action = require(actionPath);
        if (typeof action === "function") return action(process.argv.slice(3));
        console.error("执行文件请返回函数: ", actionPath + "js");
      } catch (error) {
        console.error("找不到文件: ", `${options.command}.js`, error);
      }
    });
});

program.on("--help", () => {
  console.log("\n例子: ");
  mapActions.forEach((options) => {
    if (options.command === "*") return;
    console.log(`  ${options.description}:`);
    options.examples.forEach((example) => console.log(`    ${example}`));
  });
});

program.version(version).parse(process.argv);
