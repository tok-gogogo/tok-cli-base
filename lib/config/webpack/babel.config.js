
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var global_store_1 = __importDefault(require("../global/global-store"));
var custom_config_1 = __importDefault(require("./custom.config"));
var isDev = global_store_1.default.isDev, isPro = global_store_1.default.isPro;
var babelConfig = {
    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
    comments: true,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            require.resolve('babel-plugin-named-asset-import'),
            {
                loaderMap: {
                    svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                    },
                },
            },
        ],
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
        [
            '@babel/plugin-transform-runtime',
            {
                absoluteRuntime: false,
                corejs: {
                    version: 3,
                    proposals: true,
                },
                version: '^7.14.0',
            },
            // {
            //   corejs: 3,
            //   helpers: true,
            //   regenerator: true,
            //   useESModules: true
            // }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-async-to-generator',
        // '@babel/plugin-transform-regenerator',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        isDev && 'dynamic-import-node',
        isDev && custom_config_1.default.hot && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
    cacheDirectory: true,
    cacheCompression: isPro,
    compact: isPro,
};
exports.default = babelConfig;
