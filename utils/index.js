
/**
 * 从仓库下载模板统一方法
 * @param {string} repo 仓库地址
 * @param {string} appName 项目名
 */
module.exports.clone = async function clone(repo, appName) {
  const { promisify } = require('util');
  const download = promisify(require('download-git-repo')); // 下载 git 仓库的三方库
  const ora = require('ora'); // 进度条三方库
  const chalk = require('chalk')
  const process = ora(chalk.blue('start download...'));

  process.start();
  download(repo, appName, { clone: true })
    .then(() => {
      process.succeed(chalk.green('download success'));
    })
    .catch((error) => {
      process.fail(chalk.red('download failed \n' + error));
    });
}