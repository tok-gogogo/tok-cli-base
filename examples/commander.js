#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
/**定义命令版本号**/
program.version('0.0.1');
program
    .command('create') /** 定义命令**/
    .description('创建项目-description') /** 定义命令描述**/
    .action(() => {
        /** 执行命令具体逻辑**/
        console.log('do create');
    });
/**解析命令**/
program.parse(process.argv);
