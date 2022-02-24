const  ora = require('ora');
const chalk = require('chalk');
const spinner = ora('Loading 123213').start();
setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = '2222';
}, 1000);

setTimeout(() => {
    spinner.text = `Loading ${chalk.red('rainbows red')}`;
}, 3000);

setTimeout(() => {
    spinner.fail('load success');
}, 6000);
