import fs from 'fs';

import resolveApp from '../../utils/resolveApp';
import { customConfigFileName, projectPath } from '../global/global-config';
import {
  ICustomConfig,
  ICustomConfigFileExport,
} from '../../declaration/custom-config-declaration';
import globalStore from '../global/global-store';
import defineConfig from '../../utils/defineConfig';

// require 项目自定义配置
const customConfigRequire: ICustomConfigFileExport = fs.existsSync(resolveApp(customConfigFileName))
  ? require(resolveApp(customConfigFileName))
  : {};
let requireConfig: ICustomConfig;

requireConfig = defineConfig(customConfigRequire);

// 默认的自定义配置信息
const initCustomConfig: ICustomConfig = {
  port: 6666,
  title: 'iwc app',
  publicPath: '/',
  alias: {
    '@': resolveApp('src'),
    '@src': resolveApp('src'),
    '@store': resolveApp('src/store'),
    '@components': resolveApp('src/components'),
    '@services': resolveApp('src/services'),
  },
  sourceMap: false,
  customMode: 'project',
  outputDirName: 'build',
  entry: resolveApp('src'),
  hot: true,
  eslintFix: true,
  mock: false,
  px2rem: false,
  terserWebpackPlugin: true,
};

// 合并默认配置自定义和项目自定义配置
const customConfig: ICustomConfig = {
  ...initCustomConfig,
  ...requireConfig,
  alias: {
    ...initCustomConfig.alias,
    ...requireConfig.alias,
  },
  sourceMap: globalStore.isDev ? false : requireConfig.sourceMap ?? initCustomConfig.sourceMap,
  sdkConfig: requireConfig.customMode === 'sdk' ? requireConfig.sdkConfig : void 0,
};

customConfig.entry = (() => {
    return customConfig.entry;
})();

export default customConfig;
