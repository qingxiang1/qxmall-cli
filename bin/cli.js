#!/usr/bin/env node

"use strict";

const { program } = require('commander'); // 解析命令行的命令和参数，用于处理用户输入的指令
// const inquirer = require('inquirer'); // 通用的命令行用户界面集合，用于和用户进行交互
const chalk = require('chalk'); // 终端样式
const pkg = require('../package.json');
// const { clone } = require('../utils/index');

/**
 * version
 */
program.version(chalk.green(`${pkg.version}`));

/**
* create 项目
*/
program
  .command('create <app-name>')
  .description('Generate a new project')
  .option('-f, --force', 'can overwrite target directory if it exist')
  .action((appName, options) => {
    require('../lib/create')(appName, options);
    
    // inquirer.prompt([ // 问询
    //   {
    //     type: 'list',
    //     name: 'template',
    //     message: 'which template do you choose?',
    //     choices: [
    //       'chat-node',
    //       'vue-less-code',
    //       'next-chat',
    //     ],
    //   }
    // ]).then(answer => {
    //   // clone(`direct:https://gitee.com/weibo-3880270936/react-antdpro-template.git#${answer.version}`, appName);
    //   clone(`direct:https://github.com/qingxiang1/${answer.template}.git#main`, appName);
    // })
  });


program.parse(process.argv);