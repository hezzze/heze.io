module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "react-hooks"
    ],
    "parserOptions": {
      "ecmaVersion": 8,
      "ecmaFeatures": {
          "jsx": true
      }
    },
    "parser": "babel-eslint",
    "rules": {
      "react/react-in-jsx-scope": 0,
      "comma-dangle": "off",
      "no-underscore-dangle": ["error", {
        "allow": ["_id"]
      }],
      "arrow-body-style": "off",
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      "react/prefer-stateless-function": [2, { "ignorePureComponents": true }],
      "no-param-reassign": ["error", { "props": false }],
      "react/forbid-prop-types": 0,
      "import/no-unresolved": [2, {
        ignore: ['actions/', 'components/', 'lib/']
      }],
      "import/extensions": 0,
      "import/no-extraneous-dependencies": 0,
      "no-plusplus": "off",
      "jsx-a11y/no-static-element-interactions": 0,
      "no-underscore-dangle": 0,
      "no-nested-ternary": 0,
      "react/sort-comp": 0,
      'class-methods-use-this': 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-mixed-operators": 0
    },
    "globals": {
      "React": false,
      "$": false,
      "document": false,
      "_": false,
      "window": false,
      'moment': false,
      'PropTypes': false
    },
    "settings": {
      "react": {
        "version": "16.0"
      }
    }
};
