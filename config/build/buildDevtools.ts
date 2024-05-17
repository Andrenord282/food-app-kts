import { WebpackOptions } from './types';

export const buildDevtools = (options: WebpackOptions): string => {
  const { mode } = options;

  if (mode === 'production') return 'hidden-source-map';

  return 'eval-source-map';
};
