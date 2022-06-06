1. 初始化 package.json
   npm init

2. 安装 eslint
   yarn add eslint -D

3. 初始化 eslint
   npx eslint --init

4. 新建文件夹 bin,添加 www 文件:
   #!/usr/bin/env node
   require("../src/index.js");
   第一行的意思是使用 nodejs 执行

5. 解释用户的参数
   yarn add commander -D

```
   6. "__dirname": 当前文件的绝对路径
   例子: C:\Users\licr1\Desktop\bb\src\

```

下载线上的 git: download-git-repo
https://www.npmjs.com/package/download-git-repo

响应用户输入: Inquirer
https://github.com/SBoudrias/Inquirer.js

```
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "请输入名称:",
    },
    {
      type: "input",
      name: "age",
      message: "请输入年纪:",
    },
  ])
  .then((answers) => {
    console.log(answers);
  });
```

加载提示: ora
不能使用最新版本,不支持 commomjs
yarn add ora@5.1.0

复制插件 ncp ： yarn add ncp
npc('源地址', '目标地址')

```
   关于目录：
      获取执行目录：path.resolve()
         const path = require('path');
         path.resolve('aaa') 执行目录下的aaa目录

      当前文件的目录：__dirname
```

metalsmith: 对下载下来的模板，进行修改，然后再拷贝
yarn add metalsmith consolidate ejs handlebars
