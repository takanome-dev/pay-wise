module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.json'],
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
