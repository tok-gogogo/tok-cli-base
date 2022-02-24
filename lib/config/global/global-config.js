
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectPath = exports.customConfigFileName = void 0;
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
exports.customConfigFileName = 'cloud.config.js';
exports.projectPath = {
    mockEntry: (0, resolveApp_1.default)('src/.xylib/module/mock/mock.ts'),
};
