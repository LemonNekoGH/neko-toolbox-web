module.exports = {
  root: true,
  ignorePatterns: [
    'src/**/*.js'
  ],
  env: {
    node: true,
    webextensions: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
        allowFirstLine: true
      },
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/html-indent': 'error'
  }
}
