declare const babelConfig: {
    customize: string;
    comments: boolean;
    presets: (string | (string | {
        targets: {
            browsers: string[];
        };
    })[])[];
    plugins: (string | (string | {
        loaderMap: {
            svg: {
                ReactComponent: string;
            };
        };
    })[] | (string | {
        libraryName: string;
        libraryDirectory: string;
        style: boolean;
    })[] | (string | {
        absoluteRuntime: boolean;
        corejs: {
            version: number;
            proposals: boolean;
        };
        version: string;
    })[] | (string | {
        legacy: boolean;
    })[])[];
    cacheDirectory: boolean;
    cacheCompression: boolean;
    compact: boolean;
};
export default babelConfig;
