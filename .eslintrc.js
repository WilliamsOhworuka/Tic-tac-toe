module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    extends: [
      'airbnb',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      cy: true,
      expect: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-param-reassign": ["error", { "props": false }],
      "linebreak-style": ["error", "windows"]
    },
    parser: "babel-eslint"
  };