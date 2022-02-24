
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getCustomArgv_1 = __importDefault(require("./getCustomArgv"));
var global_store_1 = __importDefault(require("../config/global/global-store"));
function defineConfig(config) {
    if (typeof config === 'function') {
        var customArgv = (0, getCustomArgv_1.default)();
        return config(__assign({ mode: global_store_1.default.mode }, customArgv));
    }
    return config;
}
exports.default = defineConfig;
