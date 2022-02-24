import { Configuration } from 'webpack';
import babelConfig from './babel.config';
import getStyleLoaders from './utils/get-style-loaders';

const regOptions = {
  baseScript: /\.(js|jsx|ts|tsx)$/,
  cssRegex: /\.css$/,
  cssModuleRegex: /\.module\.css$/,
  sassRegex: /\.(scss|sass)$/,
  sassModuleRegex: /\.module\.(scss|sass)$/,
  lessRegex: /\.less$/,
  lessModuleRegex: /\.module\.less$/,
  resourceRegex: /\.(png|jpg|jpeg|gif|bmp|ttf|md|svg|eot|woff)$/i,
};

const cssModuleConfig = {
  localIdentName: '[name]__[local]___[hash:base64:5]',
  exportLocalsConvention: 'camelCase',
};

const moduleConfig: Configuration['module'] = {
  rules: [
    // {
    //   parser: {
    //     requireEnsure: false
    //   }
    // },
    {
      test: regOptions.resourceRegex,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
    },
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      oneOf: [
        {
          test: regOptions.baseScript,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: babelConfig,
        },
        {
          test: regOptions.cssRegex,
          exclude: regOptions.cssModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 1,
            },
          }),
          sideEffects: true,
        },
        {
          test: regOptions.cssModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 1,
              modules: cssModuleConfig,
            },
          }),
        },
        {
          test: regOptions.sassRegex,
          exclude: regOptions.sassModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 2,
            },
            preProcessor: 'sass-loader',
          }),
          sideEffects: true,
        },
        {
          test: regOptions.sassModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 2,
              modules: cssModuleConfig,
            },
            preProcessor: 'sass-loader',
          }),
        },
        {
          test: regOptions.lessRegex,
          exclude: regOptions.sassModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 2,
            },
            preProcessor: 'less-loader',
          }),
          sideEffects: true,
        },
        {
          test: regOptions.lessModuleRegex,
          use: getStyleLoaders({
            cssLoaderOptions: {
              importLoaders: 2,
              modules: cssModuleConfig,
            },
            preProcessor: 'less-loader',
          }),
        },
      ],
    },
  ],
};

export default moduleConfig;
