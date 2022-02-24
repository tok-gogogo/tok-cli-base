export declare const promptList: {
    type: string;
    message: string;
    name: string;
    default: string;
}[];
/**
 * @description 生成创建项目的命令行字符串
 */
export declare const getCmdStr: (params: {
    /** 项目名称 */
    projectName: string;
    /** 语言 */
    projectUrl: string;
}) => string;
