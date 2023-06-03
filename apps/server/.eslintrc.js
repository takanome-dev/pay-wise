module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ['./tsconfig.json'],
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: ['custom/server'],
};
