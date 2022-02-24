
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
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var global_declaration_1 = require("../../declaration/global-declaration");
var resolveApp_1 = __importDefault(require("../../utils/resolveApp"));
var global_store_1 = __importDefault(require("../../config/global/global-store"));
exports.default = (function (params) {
    var mode = params.mode;
    // 初始化数据仓库
    global_store_1.default.mode = mode;
    // webpack 配置信息
    var configuration = require('../../config/webpack/webpack.config').default;
    var config = configuration();
    // custom.config 中用到了数据仓库信息，等待数据仓库信息初始化完成后引入 custom.config
    var customConfig = require('../../config/webpack/custom.config').default;
    if (mode === global_declaration_1.ModeEnum.DEV) {
        // dev server 启动配置
        var devServerOptions = __assign({ static: {
                directory: (0, resolveApp_1.default)('public'),
            }, hot: true, client: {
                // logging: 'info',
                overlay: {
                    errors: true,
                    warnings: false,
                },
            }, compress: true, open: true, proxy: customConfig.proxy, historyApiFallback: true }, customConfig.devServerOption);
        var compiler = (0, webpack_1.default)(config);
        var server = new webpack_dev_server_1.default(devServerOptions, compiler);
        // @ts-ignore
        server.listen(customConfig.port);
    }
    else if (mode === global_declaration_1.ModeEnum.PRO) {
        // 生产环境
        (0, webpack_1.default)(config, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('-------------- done --------------');
        });
    }
});
