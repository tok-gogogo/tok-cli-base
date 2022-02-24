import path from 'path';
import fse from 'fs-extra';
import inquirer from 'inquirer';

import resolveApp from '../../utils/resolveApp';
import { promptList } from './utils';
import { exec } from 'child_process';

const resolveCli = (relativePath) => path.resolve(__dirname.slice(0, -17), relativePath);

const templatePath = resolveCli('config-template');
const templates = fse.readdirSync(templatePath);

function syncFile(templates: string[]) {
  console.log('gggkkk222:',templatePath,templates)
  console.log('开始同步公用配置信息');
  console.log('同步中……');
  templates.forEach((templateName) => {
    const projectCurrentTemplatePath = resolveApp(templateName);
    const currentTemplatePath = resolveCli(`config-template/${templateName}`);
    if (fse.existsSync(projectCurrentTemplatePath)) {
      fse.unlinkSync(projectCurrentTemplatePath);
    }
    const templateStr = String(fse.readFileSync(currentTemplatePath));
    fse.writeFile(resolveApp(templateName), templateStr, function (err) {
      if (err) {
        console.log(`写入文件 ${templateName} 失败。`, err);
        return;
      }
      console.log(`${templateName} 同步完成`);
    });
  });
}

export default () => {
  inquirer.prompt(promptList(templates)).then(({ fileList }) => {
    if (fileList.length) {
      // 同步配置文件
      syncFile(fileList);
    }
  });
};
