module.exports = {
  extends: ['@takanome-dev/eslint-config-typescript'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'operator-linebreak': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'max-classes-per-file': 'off',
    'jsdoc/require-returns': 'off',
    'import/no-cycle': 'warn',
    'no-useless-constructor': 'off',
    '@typescript-eslint/naming-convention': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
  },
  ignorePatterns: ['**/*.js', 'dist'],
};
