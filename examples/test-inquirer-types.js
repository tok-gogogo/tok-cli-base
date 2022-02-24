const inquirer = require('inquirer');
let promptList =[
    {
        type: 'list',
        message: 'select Language：',
        name: 'languageByList',
        choices: [ 'javascript','java','python','c++'],
        default: 'javascript',
    },
    {
        type: 'checkbox',
        message: 'select Language：',
        name: 'languageByCheckbox',
        choices: [ 'javascript','java','python','c++'],
        default: 'javascript',
    },
    {
        type: 'confirm',
        message: 'use ：javascript',
        name: 'useJavascript',
        default: 'false',
    },
]

inquirer
    .prompt(promptList)
    .then(({languageByList,languageByCheckbox,useJavascript}) => {
        console.log('Get :',languageByList,languageByCheckbox,useJavascript);
    })
    .catch((error) => {
        console.log('get Error:',error);
    });
