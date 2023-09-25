module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2], // Example: enforce 2 spaces for indentation
    quotes: ['error', 'single'], // Example: enforce single quotes for strings
    semi: ['error', 'always'], // Example: enforce the use of semicolons
  },
};
