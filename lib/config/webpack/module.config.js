
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_config_1 = __importDefault(require("./babel.config"));
var get_style_loaders_1 = __importDefault(require("./utils/get-style-loaders"));
var regOptions = {
    baseScript: /\.(js|jsx|ts|tsx)$/,
    cssRegex: /\.css$/,
    cssModuleRegex: /\.module\.css$/,
    sassRegex: /\.(scss|sass)$/,
    sassModuleRegex: /\.module\.(scss|sass)$/,
    lessRegex: /\.less$/,
    lessModuleRegex: /\.module\.less$/,
    resourceRegex: /\.(png|jpg|jpeg|gif|bmp|ttf|md|svg|eot|woff)$/i,
};
var cssModuleConfig = {
    localIdentName: '[name]__[local]___[hash:base64:5]',
    exportLocalsConvention: 'camelCase',
};
var moduleConfig = {
    rules: [
        // {
        //   parser: {
        //     requireEnsure: false
        //   }
        // },
        {
            test: regOptions.resourceRegex,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 8 * 1024,
                },
            },
        },
        {
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            },
        },
        {
            oneOf: [
                {
                    test: regOptions.baseScript,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: babel_config_1.default,
                },
                {
                    test: regOptions.cssRegex,
                    exclude: regOptions.cssModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 1,
                        },
                    }),
                    sideEffects: true,
                },
                {
                    test: regOptions.cssModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 1,
                            modules: cssModuleConfig,
                        },
                    }),
                },
                {
                    test: regOptions.sassRegex,
                    exclude: regOptions.sassModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 2,
                        },
                        preProcessor: 'sass-loader',
                    }),
                    sideEffects: true,
                },
                {
                    test: regOptions.sassModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 2,
                            modules: cssModuleConfig,
                        },
                        preProcessor: 'sass-loader',
                    }),
                },
                {
                    test: regOptions.lessRegex,
                    exclude: regOptions.sassModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 2,
                        },
                        preProcessor: 'less-loader',
                    }),
                    sideEffects: true,
                },
                {
                    test: regOptions.lessModuleRegex,
                    use: (0, get_style_loaders_1.default)({
                        cssLoaderOptions: {
                            importLoaders: 2,
                            modules: cssModuleConfig,
                        },
                        preProcessor: 'less-loader',
                    }),
                },
            ],
        },
    ],
};
exports.default = moduleConfig;
