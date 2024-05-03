import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { WebpackOptions } from './types';

export const buildLoaders = (options: WebpackOptions): RuleSetRule[] => {
  const { mode } = options;

  const rules: RuleSetRule[] = [];

  const babelLoader: RuleSetRule = {
    test: /\.[tj]sx?$/,
    use: ['babel-loader'],
  };

  const imageLoader: RuleSetRule = {
    test: /\.(png|jpg|jpeg|svg|gif)$/i,
    type: 'asset/resource',
  };

  rules.push(babelLoader);
  rules.push(imageLoader);

  if (mode === 'development') {
    const styleSCSSLoader: RuleSetRule = {
      test: /\.s?css$/,
      exclude: /\.module\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer']],
            },
          },
        },
        'sass-loader',
      ],
    };

    const styleSCSSModulesLoader: RuleSetRule = {
      test: /\.module\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer']],
            },
          },
        },
        'sass-loader',
      ],
    };

    rules.push(styleSCSSLoader);
    rules.push(styleSCSSModulesLoader);
  }

  if (mode === 'production') {
    const styleSCSSLoader: RuleSetRule = {
      test: /\.s?css$/,
      exclude: /\.module\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer']],
            },
          },
        },
        'sass-loader',
      ],
    };

    const styleSCSSModulesLoader: RuleSetRule = {
      test: /\.module\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[hash:base64]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer']],
            },
          },
        },
        'sass-loader',
      ],
    };

    rules.push(styleSCSSLoader);
    rules.push(styleSCSSModulesLoader);
  }

  return rules;
};
