module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    // tsconfigRootDir: __dirname,
  },
  extends: ['custom'],
};
