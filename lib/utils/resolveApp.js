
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var appDirectory = fs_1.default.realpathSync(process.cwd());
exports.default = (function (relativePath) { return path_1.default.resolve(appDirectory, relativePath); });
