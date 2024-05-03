import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { WebpackOptions } from './types';

export const buildDevServer = (options: WebpackOptions): DevServerConfiguration | undefined => {
  const { mode, port } = options;

  if (mode === 'production') return undefined;

  const devServer: DevServerConfiguration = {
    host: 'localhost',
    port: port || 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
  };

  return devServer;
};
