module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    semi: ['error', 'never'],
  },
  plugins: ['detox', 'react', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.e2e.js'],
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true,
      },
    },
  ],
}
