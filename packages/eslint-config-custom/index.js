module.exports = {
  extends: ['eslint-config-base', 'airbnb', 'airbnb-typescript'],
  rules: {
    '@typescript-eslint/no-misused-promises': 'warn',
    'global-require': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, peerDependencies: false },
    ],
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    '.turbo',
    '.next',
    'public',
  ],
};
