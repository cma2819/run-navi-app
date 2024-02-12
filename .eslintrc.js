module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:react/recommended"
  ],
  parser: '@typescript-eslint/parser',
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    '@stylistic',
    '@typescript-eslint',
    "react",
  ],
  "rules": {
    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': ['error', 'always'],
  }
};
