module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/no-dynamic-require': 'off',
    'jest/expect-expect': 'off',
  },
};
