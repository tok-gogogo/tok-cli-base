
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
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
var webpack_merge_1 = require("webpack-merge");
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var global_store_1 = __importDefault(require("../global/global-store"));
var plugins_config_1 = __importDefault(require("./plugins.config"));
var custom_config_1 = __importDefault(require("./custom.config"));
var module_config_1 = __importDefault(require("./module.config"));
var defaultTerserWebpackPluginConfig = {
    test: /\.js(\?.*)?$/i,
    // 不使用并行模式进行压缩（原因：jenkins 镜像构建时内存不足导致不能生成包）
    parallel: false,
    extractComments: false,
};
exports.default = (function () {
    var mode = global_store_1.default.mode, isDev = global_store_1.default.isDev, isPro = global_store_1.default.isPro;
    var outputFileName = isPro ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js';
    var outputChunkFileName = isPro
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js';
    var assetModuleFilename = isPro
        ? 'static/resource/[name].[contenthash:8][ext][query]'
        : 'static/resource/[name][ext]';
    var sdkConfig = custom_config_1.default.sdkConfig, terserWebpackPlugin = custom_config_1.default.terserWebpackPlugin;
    var sdkName = sdkConfig === null || sdkConfig === void 0 ? void 0 : sdkConfig.name;
    if (sdkName && isPro) {
        outputFileName = (sdkConfig === null || sdkConfig === void 0 ? void 0 : sdkConfig.JSFileName) || "".concat(sdkName, "/js/").concat(sdkName, ".min.js");
        outputChunkFileName = "".concat(sdkName, "/js/").concat(sdkName, "-[name].chunk.min.js");
        assetModuleFilename = "".concat(sdkName, "/resource/[name][ext]");
    }
    var baseConfig = {
        mode: mode,
        stats: 'errors-only',
        entry: custom_config_1.default.entry,
        output: {
            path: (0, resolveApp_1.default)(custom_config_1.default.outputDirName),
            filename: outputFileName,
            chunkFilename: outputChunkFileName,
            assetModuleFilename: assetModuleFilename,
            publicPath: isPro ? custom_config_1.default.publicPath : '/',
        },
        module: module_config_1.default,
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.css', '.json', '.d.ts'],
            alias: custom_config_1.default.alias,
        },
        plugins: plugins_config_1.default,
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000,
            ignored: /node_modules/,
        },
        devtool: custom_config_1.default.sourceMap ? 'source-map' : isDev ? 'cheap-module-source-map' : void 0,
        optimization: isPro
            ? {
                minimize: true,
                minimizer: [
                    terserWebpackPlugin
                        ? new terser_webpack_plugin_1.default(__assign(__assign({}, defaultTerserWebpackPluginConfig), (terserWebpackPlugin === true ? {} : terserWebpackPlugin)))
                        : null,
                    new css_minimizer_webpack_plugin_1.default(),
                ].filter(Boolean),
            }
            : void 0,
    };
    return custom_config_1.default.webpackConfig ? (0, webpack_merge_1.merge)(baseConfig, custom_config_1.default.webpackConfig) : baseConfig;
});
