module.exports = {
  "extends": "./node_modules/@inthepocket/itp-react-scripts/dist/config/eslintrc.js",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "react",
    "babel",
    "flowtype",
  ],
  "globals": {
    "window": false,
    "$Values": true,
  },
  "rules": {
    "react/no-danger": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "no-restricted-syntax": "off",
    "import/no-useless-path-segments": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [1, { "allow": "single-child" }]
  }
}
