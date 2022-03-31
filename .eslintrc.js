module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: ['plugin:react/recommended', 'google'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 11,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'require-jsdoc': 'off',
      'linebreak-style': 'off',
      'object-curly-spacing': 'off',
      'react/prop-types': 'off',
      'indent': 'off',
      'operator-linebreak': 'off',
    },
  };
