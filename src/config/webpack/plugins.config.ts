import fs from 'fs';

import webpack, { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import nodeNotifier from 'node-notifier';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import globalStore from '../global/global-store';
import resolveApp from '../../utils/resolveApp';
import customConfig from './custom.config';
import getCustomArgv from '../../utils/getCustomArgv';

const htmlTemplate = fs.existsSync(resolveApp('public/index.html'));

let shouldCopy = false;
try {
  const list = fs.readdirSync(resolveApp('public'));
  shouldCopy = list.filter((item) => item !== 'index.html').length !== 0;
} catch (err) {
  shouldCopy = false;
}

const packageInfo = require('../../../package.json');
const { isDev, isPro } = globalStore;

const customArgv = getCustomArgv();

// html-webpack-plugin 模板配置
let htmlWebpackPluginTemplate = {};
if (htmlTemplate) {
  htmlWebpackPluginTemplate = {
    template: htmlTemplate ? resolveApp('public/index.html') : void 0,
  };
} else {
  htmlWebpackPluginTemplate = {
    templateContent: `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${customConfig.title}</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
    `,
  };
}

// html-webpack-plugin 自定义参数
const htmlWebpackPluginCustomParams: {
  publicPath: string;
  [key: string]: any;
} = {
  publicPath: isPro ? customConfig.publicPath : '',
  mode: globalStore.mode,
  NODE_ENV: globalStore.mode,
  ...customArgv,
};

let cssFilename = 'static/css/[name].[contenthash:8].css';
let cssChunkFilename = 'static/css/[name].[contenthash:8].chunk.css';

const sdkConfig = customConfig.sdkConfig;
const sdkName = sdkConfig?.name;

if (sdkName) {
  cssFilename = sdkConfig?.CSSFileName || `${sdkName}/css/${sdkName}.min.css`;
  cssChunkFilename = `${sdkName}/css/${sdkName}-[name].chunk.min.css`;
}

// @ts-ignore
const pluginsConfig: Configuration['plugins'] = [
  new WebpackBar({
    name: packageInfo.name,
    color: '#1890FF',
  }),
  isPro &&
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolveApp(customConfig.outputDirName)],
    }),
  ['project'].includes(customConfig.customMode) &&
    new HtmlWebpackPlugin({
      title: customConfig.title,
      templateParameters: {
        customParams: htmlWebpackPluginCustomParams,
      },
      ...htmlWebpackPluginTemplate,
    }),
  new ESLintPlugin({
    eslintPath: require.resolve('eslint'),
    extensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
    fix: customConfig.eslintFix,
  }),
  isDev && new webpack.HotModuleReplacementPlugin({}),
  new FriendlyErrorsPlugin({
    onError(severity, errors) {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0];
      nodeNotifier.notify({
        title: `${packageInfo.name} error`,
        message: severity + ': ' + error.name,
        subtitle: error.file || '',
      });
    },
  }),
  isPro &&
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: cssChunkFilename,
    }),
  isPro &&
    shouldCopy &&
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolveApp('public'),
          to: '.',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  new webpack.DefinePlugin({
    process: {
      env: {
        mode: JSON.stringify(globalStore.mode),
        NODE_ENV: JSON.stringify(globalStore.mode),
        ...(() => {
          let list = {};
          for (let [k, v] of Object.entries(customArgv)) {
            list[k] = JSON.stringify(v);
          }
          return list;
        })(),
      },
    },
    ...customConfig.define,
  }),
  customConfig.moduleFederationConfig &&
    new webpack.container.ModuleFederationPlugin(customConfig.moduleFederationConfig),
  isDev &&
    customConfig.hot &&
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
].filter(Boolean);

export default pluginsConfig;
