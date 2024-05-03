import crypto from 'crypto';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const generateScopedName = (name: string, filename: string, css: string) => {
  const componentName = filename
    .replace(/\.\w+$/, '')
    .replace(/.module/, '')
    .split('/')
    .pop();
  const hash = crypto.createHash('md5').update(css).digest('hex').slice(0, 5);

  return `${componentName}__${name}__${hash}`;
};

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasName = alias.replace(/[^a-zA-Z]/g, '');
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    webpackConfigAliases[aliasName] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

parseTsConfigPaths(tsconfig.compilerOptions.paths);

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName,
    },
  },
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});
