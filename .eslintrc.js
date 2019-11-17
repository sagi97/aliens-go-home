module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  rules: {
    'react/button-has-type': 0,
    'react/require-default-props': 0,
    'import/named': 0,
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0
  }
};
