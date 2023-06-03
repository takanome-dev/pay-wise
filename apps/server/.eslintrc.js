module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    // tsconfigRootDir: __dirname,
  },
  extends: ['custom-server'],
};
