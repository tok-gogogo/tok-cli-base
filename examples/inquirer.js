const inquirer = require('inquirer');
inquirer
    /** 交互命令行**/
    .prompt([{
            /** type支持input, number, confirm, list, rawlist, expand, checkbox, password, editor**/
            type: 'input',
            message: '项目名称：',
            name: 'projectName',
            default: 'test-project',
        }])
    .then(({projectName}) => {
        /** 获取交互信息**/
        console.log('Get ProjectName:',projectName);
    })
    .catch((error) => {
        /** 异常信息**/
        console.log('get Error:',error);
    });
