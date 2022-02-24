
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var global_config_1 = require("../global/global-config");
var global_store_1 = __importDefault(require("../global/global-store"));
var defineConfig_1 = __importDefault(require("../../utils/defineConfig"));
// require 项目自定义配置
var customConfigRequire = fs_1.default.existsSync((0, resolveApp_1.default)(global_config_1.customConfigFileName))
    ? require((0, resolveApp_1.default)(global_config_1.customConfigFileName))
    : {};
var requireConfig;
requireConfig = (0, defineConfig_1.default)(customConfigRequire);
// 默认的自定义配置信息
var initCustomConfig = {
    port: 6666,
    title: 'iwc app',
    publicPath: '/',
    alias: {
        '@': (0, resolveApp_1.default)('src'),
        '@src': (0, resolveApp_1.default)('src'),
        '@store': (0, resolveApp_1.default)('src/store'),
        '@components': (0, resolveApp_1.default)('src/components'),
        '@services': (0, resolveApp_1.default)('src/services'),
    },
    sourceMap: false,
    customMode: 'project',
    outputDirName: 'build',
    entry: (0, resolveApp_1.default)('src'),
    hot: true,
    eslintFix: true,
    mock: false,
    px2rem: false,
    terserWebpackPlugin: true,
};
// 合并默认配置自定义和项目自定义配置
var customConfig = __assign(__assign(__assign({}, initCustomConfig), requireConfig), { alias: __assign(__assign({}, initCustomConfig.alias), requireConfig.alias), sourceMap: global_store_1.default.isDev ? false : (_a = requireConfig.sourceMap) !== null && _a !== void 0 ? _a : initCustomConfig.sourceMap, sdkConfig: requireConfig.customMode === 'sdk' ? requireConfig.sdkConfig : void 0 });
customConfig.entry = (function () {
    return customConfig.entry;
})();
exports.default = customConfig;
