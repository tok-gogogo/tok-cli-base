
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var utils_1 = require("./utils");
var resolveCli = function (relativePath) { return path_1.default.resolve(__dirname.slice(0, -17), relativePath); };
var templatePath = resolveCli('config-template');
var templates = fs_extra_1.default.readdirSync(templatePath);
function syncFile(templates) {
    console.log('gggkkk222:', templatePath, templates);
    console.log('开始同步公用配置信息');
    console.log('同步中……');
    templates.forEach(function (templateName) {
        var projectCurrentTemplatePath = (0, resolveApp_1.default)(templateName);
        var currentTemplatePath = resolveCli("config-template/".concat(templateName));
        if (fs_extra_1.default.existsSync(projectCurrentTemplatePath)) {
            fs_extra_1.default.unlinkSync(projectCurrentTemplatePath);
        }
        var templateStr = String(fs_extra_1.default.readFileSync(currentTemplatePath));
        fs_extra_1.default.writeFile((0, resolveApp_1.default)(templateName), templateStr, function (err) {
            if (err) {
                console.log("\u5199\u5165\u6587\u4EF6 ".concat(templateName, " \u5931\u8D25\u3002"), err);
                return;
            }
            console.log("".concat(templateName, " \u540C\u6B65\u5B8C\u6210"));
        });
    });
}
exports.default = (function () {
    inquirer_1.default.prompt((0, utils_1.promptList)(templates)).then(function (_a) {
        var fileList = _a.fileList;
        if (fileList.length) {
            // 同步配置文件
            syncFile(fileList);
        }
    });
});
