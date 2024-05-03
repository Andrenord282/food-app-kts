module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV_MODE);
  return {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
      'babel-preset-mobx',
    ],

    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      process.env.NODE_ENV_MODE === 'development' && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
