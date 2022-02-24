import { ICustomConfig, ICustomConfigFileExport } from '../declaration/custom-config-declaration';
import getCustomArgv from './getCustomArgv';
import globalStore from '../config/global/global-store';

function defineConfig(config: ICustomConfigFileExport): ICustomConfig {
  if (typeof config === 'function') {
    const customArgv = getCustomArgv();
    return config({
      mode: globalStore.mode,
      ...customArgv,
    });
  }
  return config;
}

export default defineConfig;
