import { Configuration } from 'webpack';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

import resolveApp from '../../utils/resolveApp';
import globalStore from '../global/global-store';

import pluginsConfig from './plugins.config';
import customConfig from './custom.config';
import moduleConfig from './module.config';

const defaultTerserWebpackPluginConfig = {
  test: /\.js(\?.*)?$/i,
  // 不使用并行模式进行压缩（原因：jenkins 镜像构建时内存不足导致不能生成包）
  parallel: false,
  extractComments: false,
};

export default () => {
  const { mode, isDev, isPro } = globalStore;
  let outputFileName = isPro ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js';
  let outputChunkFileName = isPro
    ? 'static/js/[name].[contenthash:8].chunk.js'
    : 'static/js/[name].chunk.js';
  let assetModuleFilename = isPro
    ? 'static/resource/[name].[contenthash:8][ext][query]'
    : 'static/resource/[name][ext]';

  const { sdkConfig, terserWebpackPlugin } = customConfig;
  const sdkName = sdkConfig?.name;

  if (sdkName && isPro) {
    outputFileName = sdkConfig?.JSFileName || `${sdkName}/js/${sdkName}.min.js`;
    outputChunkFileName = `${sdkName}/js/${sdkName}-[name].chunk.min.js`;
    assetModuleFilename = `${sdkName}/resource/[name][ext]`;
  }

  const baseConfig: Configuration = {
    mode,

    stats: 'errors-only',

    entry: customConfig.entry,

    output: {
      path: resolveApp(customConfig.outputDirName),
      filename: outputFileName,
      chunkFilename: outputChunkFileName,
      assetModuleFilename,
      publicPath: isPro ? customConfig.publicPath : '/',
    },

    module: moduleConfig,

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.css', '.json', '.d.ts'],
      alias: customConfig.alias,
    },

    plugins: pluginsConfig,

    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000,
      ignored: /node_modules/,
    },

    devtool: customConfig.sourceMap ? 'source-map' : isDev ? 'cheap-module-source-map' : void 0,

    optimization: isPro
      ? {
          minimize: true,
          minimizer: [
            terserWebpackPlugin
              ? new TerserPlugin({
                  ...defaultTerserWebpackPluginConfig,
                  ...(terserWebpackPlugin === true ? {} : terserWebpackPlugin),
                })
              : null,
            new CssMinimizerPlugin(),
          ].filter(Boolean),
        }
      : void 0,
  };

  return customConfig.webpackConfig ? merge(baseConfig, customConfig.webpackConfig) : baseConfig;
};
