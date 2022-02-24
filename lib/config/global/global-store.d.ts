import { ModeEnum } from '../../declaration/global-declaration';
declare class GlobalStore {
    /**
     * @description 模式（开发、生产）
     */
    private _mode;
    /**
     * @description 是否是开发模式
     */
    isDev: boolean;
    /**
     * @description 是否是生产模式
     */
    isPro: boolean;
    set mode(mode: ModeEnum);
    get mode(): ModeEnum;
}
declare const globalStore: GlobalStore;
export default globalStore;
