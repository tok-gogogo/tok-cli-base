
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptList = void 0;
// 创建项目终端交互内容
var promptList = function (templates) { return [
    {
        type: 'checkbox',
        message: '需要同步的配置文件：',
        name: 'fileList',
        choices: templates,
    },
]; };
exports.promptList = promptList;
