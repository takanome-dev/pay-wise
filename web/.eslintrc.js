module.exports = {
  extends: ['@takanome-dev/eslint-config'],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'no-undef': 'off',
    'jsdoc/require-jsdoc': 'off',
  },
  ignorePatterns: ['**/*.js'],
};
