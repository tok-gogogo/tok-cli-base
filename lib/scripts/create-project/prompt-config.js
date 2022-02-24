
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCmdStr = exports.promptList = void 0;
var project_template_git_1 = __importDefault(require("../../config/global/project-template-git"));
// 创建项目终端交互内容
exports.promptList = [
    {
        type: 'input',
        message: '项目名称：',
        name: 'projectName',
        default: 'test-project',
    },
    {
        type: 'input',
        message: '项目url：',
        name: 'projectUrl',
        default: project_template_git_1.default,
    },
    // {
    //   type: 'list',
    //   message: '语言：',
    //   name: 'language',
    //   choices: ['TypeScript', 'JavaScript'],
    //   filter: (val) => val.toLowerCase(),
    // },
];
/**
 * @description 生成创建项目的命令行字符串
 */
var getCmdStr = function (params) {
    var projectName = params.projectName, projectUrl = params.projectUrl;
    var cmdStrList = [
        "git clone ".concat(projectUrl, " ").concat(projectName),
        "cd ".concat(projectName),
    ];
    return cmdStrList.join(' && ');
};
exports.getCmdStr = getCmdStr;
