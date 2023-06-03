module.exports = {
  root: true,
  extends: ['custom/web'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ['./tsconfig.json'],
    project: true,
    tsconfigRootDir: __dirname,
  },
};
