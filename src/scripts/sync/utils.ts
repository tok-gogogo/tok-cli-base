

// 创建项目终端交互内容
export const promptList = (templates: string[]) => [
  {
    type: 'checkbox',
    message: '需要同步的配置文件：',
    name: 'fileList',
    choices: templates,
  },
];
