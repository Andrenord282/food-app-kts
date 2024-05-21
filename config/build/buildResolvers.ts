import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { WebpackOptions } from './types';

export const buildResolvers = (options: WebpackOptions): WebpackConfiguration['resolve'] => {
  const { paths } = options;
  const resolve: WebpackConfiguration['resolve'] = {};
  resolve.extensions = ['.tsx', '.ts', '.js'];

  resolve.alias = {
    components: path.join(paths.src, 'components'),
    config: path.join(paths.src, 'config'),
    styles: path.join(paths.src, 'styles'),
    utils: path.join(paths.src, 'utils'),
    services: path.join(paths.src, 'services'),
    hooks: path.join(paths.src, 'hooks'),
    store: path.join(paths.src, 'store'),
    context: path.join(paths.src, 'context'),
    assets: path.join(paths.src, 'assets'),
  };

  return resolve;
};
