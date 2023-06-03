module.exports = {
  extends: ['./index', 'airbnb-base', 'airbnb-typescript/base'],
  rules: {
    // TODO: remove this and fix all the errors
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'warn',
    'max-classes-per-file': 'off',
    'no-await-in-loop': 'warn',
  },
  ignorePatterns: ['**/*.js', 'node_modules', '.turbo', 'dist'],
};
