import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';
import { buildDevtools } from './buildDevtools';
import { buildLoaders } from './buildLoaders';
import { Configuration as WebpackConfiguration } from 'webpack';
import { WebpackOptions } from './types';
import { buildResolvers } from './buildResolvers';

export const buildConfig = (options: WebpackOptions): WebpackConfiguration => {
  const config: WebpackConfiguration = {
    mode: options.mode,
    entry: {
      bundle: options.paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: options.paths.output,
      clean: true,
    },
    target: options.mode === 'development' ? 'web' : 'browserslist',
    devtool: buildDevtools(options),
    devServer: buildDevServer(options),
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
  };

  return config;
};
