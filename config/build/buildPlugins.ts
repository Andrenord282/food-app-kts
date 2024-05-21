import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { WebpackPluginInstance } from 'webpack';

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
    // plugins.push(
    //   new webpack.DefinePlugin({
    //     'process.env.ENV_SPOONACULAR_API_KEY': JSON.stringify(process.env.ENV_SPOONACULAR_API_KEY),
    //     'process.env.ENV_FIREBASE_APP_ID': JSON.stringify(process.env.ENV_FIREBASE_APP_ID),
    //     'process.env.ENV_FIREBASE_API_KEY': JSON.stringify(process.env.ENV_FIREBASE_API_KEY),
    //     'process.env.ENV_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.ENV_FIREBASE_MESSAGING_SENDER_ID),
    //   }),
    // );
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
