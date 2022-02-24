import { ModeEnum } from '../../declaration/global-declaration';

class GlobalStore {
  /**
   * @description 模式（开发、生产）
   */
  private _mode: ModeEnum = ModeEnum.PRO;

  /**
   * @description 是否是开发模式
   */
  isDev: boolean = false;

  /**
   * @description 是否是生产模式
   */
  isPro: boolean = true;

  set mode(mode: ModeEnum) {
    this._mode = mode;
    this.isDev = mode === ModeEnum.DEV;
    this.isPro = mode === ModeEnum.PRO;
  }

  get mode() {
    return this._mode;
  }
}

const globalStore = new GlobalStore();

export default globalStore;
