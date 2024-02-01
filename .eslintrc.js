module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
    'object-property-newline': 'off',
    'object-curly-newline': 'off'
  }
}
