module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-typescript',
    '@babel/preset-env'
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    }
  }
}
