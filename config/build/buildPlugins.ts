import webpack, { WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { WebpackOptions } from './types';

export const buildPlugins = (options: WebpackOptions): WebpackPluginInstance[] => {
  const { mode, paths } = options;

  const plugins: WebpackPluginInstance[] = [];

  if (mode === 'development') {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  if (mode === 'production') {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    );
  }

  plugins.push(
    new HtmlWebpackPlugin({
      title: 'food app kts',
      favicon: paths.favicon,
      template: paths.public,
    }),
  );

  return plugins;
};
