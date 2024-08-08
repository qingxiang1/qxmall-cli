const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator');

// 1. 对外抛出一个方法用来接收用户需要穿件文件的项目&参数
module.exports = async function(name, options) {
  // 判断项目是否存在
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);

  if (fs.existsSync(targetAir)) {
    // 是否为强制创建
    if (options.force) {
        await fs.remove(targetAir);
    } else {
      // 询问用户是否要确定覆盖
      let { action } = await inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'Target directory already exists',
        choices: [{
          name: 'Overwrite',
          value: 'overwrite'
        }, {
          name: 'Cancel',
          value: false
        }]
      }]);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        await fs.remove(targetAir);
      }
    }
  }

  // 新建模版
  const generator = new Generator(name, targetAir);
  generator.create();
}