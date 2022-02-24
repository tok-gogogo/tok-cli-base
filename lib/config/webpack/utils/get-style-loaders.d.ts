interface IGetStyleLoadersOptions {
    /** css-loader 配置 */
    cssLoaderOptions?: any;
    /** 是否使用 css module */
    useCssModule?: boolean;
    /** 其他预处理器 */
    preProcessor?: 'less-loader' | 'sass-loader';
}
declare const getStyleLoaders: (options: IGetStyleLoadersOptions) => any[];
export default getStyleLoaders;
