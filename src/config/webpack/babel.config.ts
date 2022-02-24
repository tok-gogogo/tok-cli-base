import globalStore from '../global/global-store';
import customConfig from './custom.config';

const { isDev, isPro } = globalStore;

const babelConfig = {
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
    isDev && customConfig.hot && require.resolve('react-refresh/babel'),
  ].filter(Boolean),
  cacheDirectory: true,
  cacheCompression: isPro,
  compact: isPro,
};

export default babelConfig;
