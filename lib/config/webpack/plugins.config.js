
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var webpack_1 = __importDefault(require("webpack"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var friendly_errors_webpack_plugin_1 = __importDefault(require("friendly-errors-webpack-plugin"));
var node_notifier_1 = __importDefault(require("node-notifier"));
var eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var global_store_1 = __importDefault(require("../global/global-store"));
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var custom_config_1 = __importDefault(require("./custom.config"));
var getCustomArgv_1 = __importDefault(require("../../utils/getCustomArgv"));
var htmlTemplate = fs_1.default.existsSync((0, resolveApp_1.default)('public/index.html'));
var shouldCopy = false;
try {
    var list = fs_1.default.readdirSync((0, resolveApp_1.default)('public'));
    shouldCopy = list.filter(function (item) { return item !== 'index.html'; }).length !== 0;
}
catch (err) {
    shouldCopy = false;
}
var packageInfo = require('../../../package.json');
var isDev = global_store_1.default.isDev, isPro = global_store_1.default.isPro;
var customArgv = (0, getCustomArgv_1.default)();
// html-webpack-plugin 模板配置
var htmlWebpackPluginTemplate = {};
if (htmlTemplate) {
    htmlWebpackPluginTemplate = {
        template: htmlTemplate ? (0, resolveApp_1.default)('public/index.html') : void 0,
    };
}
else {
    htmlWebpackPluginTemplate = {
        templateContent: "\n      <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>".concat(custom_config_1.default.title, "</title>\n          </head>\n          <body>\n            <div id=\"root\"></div>\n          </body>\n        </html>\n    "),
    };
}
// html-webpack-plugin 自定义参数
var htmlWebpackPluginCustomParams = __assign({ publicPath: isPro ? custom_config_1.default.publicPath : '', mode: global_store_1.default.mode, NODE_ENV: global_store_1.default.mode }, customArgv);
var cssFilename = 'static/css/[name].[contenthash:8].css';
var cssChunkFilename = 'static/css/[name].[contenthash:8].chunk.css';
var sdkConfig = custom_config_1.default.sdkConfig;
var sdkName = sdkConfig === null || sdkConfig === void 0 ? void 0 : sdkConfig.name;
if (sdkName) {
    cssFilename = (sdkConfig === null || sdkConfig === void 0 ? void 0 : sdkConfig.CSSFileName) || "".concat(sdkName, "/css/").concat(sdkName, ".min.css");
    cssChunkFilename = "".concat(sdkName, "/css/").concat(sdkName, "-[name].chunk.min.css");
}
// @ts-ignore
var pluginsConfig = [
    new webpackbar_1.default({
        name: packageInfo.name,
        color: '#1890FF',
    }),
    isPro &&
        new clean_webpack_plugin_1.CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [(0, resolveApp_1.default)(custom_config_1.default.outputDirName)],
        }),
    ['project'].includes(custom_config_1.default.customMode) &&
        new html_webpack_plugin_1.default(__assign({ title: custom_config_1.default.title, templateParameters: {
                customParams: htmlWebpackPluginCustomParams,
            } }, htmlWebpackPluginTemplate)),
    new eslint_webpack_plugin_1.default({
        eslintPath: require.resolve('eslint'),
        extensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
        fix: custom_config_1.default.eslintFix,
    }),
    isDev && new webpack_1.default.HotModuleReplacementPlugin({}),
    new friendly_errors_webpack_plugin_1.default({
        onError: function (severity, errors) {
            if (severity !== 'error') {
                return;
            }
            var error = errors[0];
            node_notifier_1.default.notify({
                title: "".concat(packageInfo.name, " error"),
                message: severity + ': ' + error.name,
                subtitle: error.file || '',
            });
        },
    }),
    isPro &&
        new mini_css_extract_plugin_1.default({
            filename: cssFilename,
            chunkFilename: cssChunkFilename,
        }),
    isPro &&
        shouldCopy &&
        new copy_webpack_plugin_1.default({
            patterns: [
                {
                    from: (0, resolveApp_1.default)('public'),
                    to: '.',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    new webpack_1.default.DefinePlugin(__assign({ process: {
            env: __assign({ mode: JSON.stringify(global_store_1.default.mode), NODE_ENV: JSON.stringify(global_store_1.default.mode) }, (function () {
                var e_1, _a;
                var list = {};
                try {
                    for (var _b = __values(Object.entries(customArgv)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                        list[k] = JSON.stringify(v);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return list;
            })()),
        } }, custom_config_1.default.define)),
    custom_config_1.default.moduleFederationConfig &&
        new webpack_1.default.container.ModuleFederationPlugin(custom_config_1.default.moduleFederationConfig),
    isDev &&
        custom_config_1.default.hot &&
        new react_refresh_webpack_plugin_1.default({
            overlay: false,
        }),
].filter(Boolean);
exports.default = pluginsConfig;
