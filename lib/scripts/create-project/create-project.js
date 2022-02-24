
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
var fs_extra_1 = __importDefault(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
var prompt_config_1 = require("./prompt-config");
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var ora_1 = __importDefault(require("ora"));
function default_1() {
    inquirer_1.default.prompt(prompt_config_1.promptList).then(function (_a) {
        var projectName = _a.projectName, projectUrl = _a.projectUrl;
        var cwd = process.cwd();
        var cmdStr = (0, prompt_config_1.getCmdStr)({
            projectName: projectName,
            projectUrl: projectUrl,
        });
        console.log(chalk_1.default.blue('开始创建项目'));
        var spinner = (0, ora_1.default)('创建中……').start();
        (0, child_process_1.exec)(cmdStr, { cwd: cwd }, function (err) {
            if (err) {
                // 截取错误提示并在控制台输出
                var failStrIndex = err.message.indexOf('fatal:');
                console.log('失败原因：', err.message.slice(failStrIndex));
                spinner.fail('创建项目失败');
                return;
            }
            spinner.succeed('创建项目成功');
            fs_extra_1.default.removeSync((0, resolveApp_1.default)("".concat(projectName, "/.git")));
            (0, child_process_1.exec)("cd ".concat(projectName, " && git init"));
            // console.log('项目创建成功');
        });
    });
}
exports.default = default_1;
