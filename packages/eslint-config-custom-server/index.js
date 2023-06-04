module.exports = {
  extends: ['eslint-config-base', 'airbnb-base', 'airbnb-typescript/base'],
  rules: {
    // TODO: remove this and fix all the errors
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'warn',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'no-await-in-loop': 'warn',
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['**/*.js', 'node_modules', '.turbo', 'dist'],
};
