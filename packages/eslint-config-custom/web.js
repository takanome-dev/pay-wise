module.exports = {
  extends: ['./index', 'airbnb', 'airbnb-typescript'],
  rules: {
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-constructed-context-values': 'off',
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
