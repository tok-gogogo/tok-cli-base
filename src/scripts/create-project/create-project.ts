import inquirer from 'inquirer';
import { exec } from 'child_process';
import fse from 'fs-extra';
import chalk from 'chalk';
import { promptList, getCmdStr } from './prompt-config';
import resolveApp from '../../utils/resolveApp';
import ora from "ora";

export default function () {
  inquirer.prompt(promptList).then(({ projectName, projectUrl }) => {

    const cwd = process.cwd();
    const cmdStr = getCmdStr({
      projectName,
      projectUrl,
    });
    console.log(chalk.blue('开始创建项目'));

    const spinner = ora('创建中……').start();
    exec(cmdStr, { cwd }, function (err) {
      if (err) {
        // 截取错误提示并在控制台输出
        const failStrIndex = err.message.indexOf('fatal:');
        console.log('失败原因：', err.message.slice(failStrIndex));
        spinner.fail('创建项目失败');
        return;
      }
      spinner.succeed('创建项目成功');
      fse.removeSync(resolveApp(`${projectName}/.git`));
      exec(`cd ${projectName} && git init`);
      // console.log('项目创建成功');
    });
  });
}
