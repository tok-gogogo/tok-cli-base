import { Configuration } from 'webpack';
import { ModeEnum } from './global-declaration';
/**
 * @description 自定义配置声明
 */
export interface ICustomConfig {
    /** 端口号 */
    port?: number;
    /** html 标题 */
    title?: string;
    /** webpack 的 publicPath */
    publicPath?: string;
    /** 代理配置，webpack-dev-server proxy */
    proxy?: any;
    /** dev server 配置 */
    devServerOption?: {
        /** 启动后是否自动打开浏览器 */
        open?: boolean;
        /** 一些其他配置 */
        [key: string]: any;
    };
    /** webpack alias 配置 */
    alias?: Configuration['resolve']['alias'];
    /** 是否生成 map 文件，production 下生效 */
    sourceMap?: boolean;
    /** webpack 入口起点 **/
    entry?: Configuration['entry'];
    /** 一些声明 */
    define?: Record<string, string>;
    /** antd 主题样式配置 */
    antdLessModifyVars?: Record<string, string>;
    /** cloud-xinyi 主题样式配置 */
    cloudXyScssModifyVars?: {
        'xy-primary-color': string;
    };
    /** webpack 自定义配置 */
    webpackConfig?: Configuration;
    /** moduleFederationConfig */
    moduleFederationConfig?: any;
    /** 自定义构建模式，默认 project */
    customMode?: 'project' | 'sdk';
    /** sdk 构建配置 */
    sdkConfig?: {
        /** sdk 名称 */
        name?: string;
        /** js 文件名 */
        JSFileName?: string;
        /** css 文件名 */
        CSSFileName?: string;
    };
    /** 输出的文件夹名称 */
    outputDirName?: string;
    /** 是否开启热更新 */
    hot?: boolean;
    /** 开启 eslint 自动修复 */
    eslintFix?: boolean;
    /** 是否开启 mock 功能 */
    mock?: boolean;
    /** 是否开启 px2rem */
    px2rem?: {
        rootValue?: number | Record<string, number>;
        unitPrecision?: number;
        propWhiteList?: any[];
        propBlackList?: any[];
        exclude?: RegExp;
        selectorBlackList?: any[];
        ignoreIdentifier?: boolean | string;
        replace?: boolean;
        mediaQuery?: boolean;
        minPixelValue?: number;
    } | boolean;
    terserWebpackPlugin?: Record<string, any> | boolean;
}
/**
 * @description 自定义配置文件导出方法的参数声明
 */
interface ICustomConfigFileExportFunParams {
    mode: ModeEnum;
    [key: string]: string;
}
/**
 * @description 自定义配置文件导出的类型
 */
export declare type ICustomConfigFileExport = ICustomConfig | ((params: ICustomConfigFileExportFunParams) => ICustomConfig);
export {};
