import inquirer from 'inquirer';
import ora from 'ora';

import {ModeEnum} from '../../declaration/global-declaration';
import resolveApp from '../../utils/resolveApp';
import globalStore from '../../config/global/global-store';
import {getCmdStr, promptList} from "../create-project/prompt-config";
import chalk from "chalk";
import {exec} from "child_process";
import fse from "fs-extra";
import path from "path";

const key = resolveApp('');
const resolveCli = (relativePath) => path.resolve(__dirname.slice(0, -19), relativePath);

const pluginPath = resolveCli('pluginBase/plugin.json');

export default async () => {
    let pluginObj = {}
    const packageObj = await fse.readJson(pluginPath);
    pluginObj = packageObj || pluginObj;
    let installArray = [];
    if (pluginObj.hasOwnProperty(key)) {
        installArray = pluginObj[key];
    }
    let  choices = ['element', 'vue-table', 'vuex'];
    if(installArray.length>0){
        choices =choices.filter(val=>!installArray.includes(val))
        const sep = new inquirer.Separator();
        choices.unshift(sep);
        let disableArray = installArray.map(val=>{return {name:val, disabled: 'installed'}});
        // @ts-ignore
        choices = disableArray.concat(choices);
    }

    const promptList = {
        type: 'list',
        message: '请选择要安装的插件：',
        name: 'pluginName',
        choices: choices,
    };
    inquirer.prompt(promptList).then(({pluginName}) => {

        // spinner.text = ;
        // console.log(chalk.blue('开始安装插件……'), pluginName);
        installArray.push(pluginName);
        pluginObj[key] = installArray;
        const cwd = process.cwd();
        const cmdStr = `npm install -s  ${pluginName}`;
        console.log(`开始安装插件：${chalk.blue(pluginName)}`)
        const spinner = ora('安装中……').start();
        exec(cmdStr, { cwd }, function (err) {
          if (err) {
            // 截取错误提示并在控制台输出
            const failStrIndex = err.message.indexOf('fatal:');
            console.log('失败原因：', err.message.slice(failStrIndex));
            spinner.fail('安装插件失败');
            return;
          }
          fse.writeJsonSync(pluginPath, pluginObj);
          spinner.succeed('安装插件成功');
          // console.log(chalk.blue('安装插件成功'));
        });
    });
};
