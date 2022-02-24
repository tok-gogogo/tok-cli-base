
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
var global_store_1 = __importDefault(require("../../global/global-store"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var custom_config_1 = __importDefault(require("../custom.config"));
var getStyleLoaders = function (options) {
    var isDev = global_store_1.default.isDev, isPro = global_store_1.default.isPro;
    var sourceMap = custom_config_1.default.sourceMap;
    var cssLoaderOptions = options.cssLoaderOptions, preProcessor = options.preProcessor;
    var loaders = [
        isDev && require.resolve('style-loader'),
        isPro && mini_css_extract_plugin_1.default.loader,
        {
            loader: require.resolve('css-loader'),
            options: __assign({ sourceMap: sourceMap }, cssLoaderOptions),
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox: 'no-2009',
                            },
                            stage: 3,
                        }),
                        custom_config_1.default.px2rem
                            ? require('postcss-plugin-px2rem')(__assign({ rootValue: 37.5 }, (typeof custom_config_1.default.px2rem === 'boolean' ? {} : custom_config_1.default.px2rem)))
                            : null,
                    ].filter(Boolean),
                },
                sourceMap: sourceMap,
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        if (preProcessor === 'less-loader') {
            loaders.push({
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: sourceMap,
                    lessOptions: {
                        modifyVars: __assign({}, custom_config_1.default.antdLessModifyVars),
                        javascriptEnabled: true,
                    },
                },
            });
        }
        else if (preProcessor === 'sass-loader') {
            var styleVariables_1 = custom_config_1.default.cloudXyScssModifyVars;
            loaders.push({
                loader: require.resolve(preProcessor),
                options: {
                    additionalData: Object.keys(styleVariables_1)
                        .map(function (k) { return "$".concat(k, ": ").concat(styleVariables_1[k], ";"); })
                        .join('\n'),
                },
            });
        }
        else {
            loaders.push({
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: sourceMap,
                },
            });
        }
    }
    return loaders;
};
exports.default = getStyleLoaders;
