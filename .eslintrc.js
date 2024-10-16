module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
  },

  "plugins": ["@typescript-eslint", "react", "react-native", "react-hooks", "graphql", "simple-import-sort", "import", "prettier", "lodash", "ban"],
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react-native/all", "prettier"],
  "rules": {
    "prettier/prettier": ["error", {
      bracketSpacing: true,
      singleQuote: true,
      jsxSingleQuote: true,
      semi: false,
      "endOfLine": "auto"
    }],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "curly": ["error", "all"],
    "eol-last": "off",

    "indent": "off",

    // do not require properties to be marked as public - it's their default
    "@typescript-eslint/explicit-member-accessibility": ["error", { "accessibility": "no-public" }],

    // overwritten by "@typescript-eslint/no-unused-vars"
    "no-unused-vars": "off",

    // react-native styles are defined after components
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",

    //disallow React to be incorrectly marked as unused
    "react/jsx-uses-react": "off",
    // disable validating import React in every jsx scope
    "react/react-in-jsx-scope": "off",

    // we use Text in elements like <CustomText> and <RoutineItem.Text>
    "react-native/no-raw-text": "off",

    // we use TypeScript instead of prop-types
    "react/prop-types": "off",

    // we need a way to get around TypeScipt when there's no good solution
    "@typescript-eslint/ban-ts-ignore": "off",

    // we use void to avoid unused variable errors where there's no other way
    "no-void": "off",

    "react/jsx-closing-bracket-location": ["error", {
      "nonEmpty": "line-aligned",
      "selfClosing": "line-aligned"
    }],

    // sorting imports
    // https://github.com/lydell/eslint-plugin-simple-import-sort/
    // https://github.com/benmosher/eslint-plugin-import/
    // "simple-import-sort/exports": [
    //   "error"
    // ],
    "react-native/sort-styles": [
      "error", "asc", { "ignoreClassNames": false, "ignoreStyleProperties": false }
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // packages: `react` and `expo` related packages come first
          ["^react", "react", "expo", "^@?\\w"],
          // $root imports
          ["^\\$root"],
          // $src imports
          ["^\\$src/core", "^\\$src/constants"],
          ["^\\$src/native"],
          ["^\\$src/modules"],
          ["^\\$assets"],
          // tests imports
          ["^\\$__tests"],
          // relative imports: parents, children, same-folder  `..` and `.` last
          ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    // restricting imports (that still exist but should not be used any longer)
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["lodash-es/*"],
        "message": "Please use the default import from 'lodash' instead.",
        }],
      "patterns": [{
        "group": [".*"],
        "message": "Please use absolute import instead",
      }],
      "paths": [
        {
          "name": "expo",
          "message": "import from 'expo-*' modules instead",
        },
        {
          "name": "react-native",
          "importNames": [ "TouchableOpacity",  ],
          "message": "Don't import this package from react-native. Use Kit items instead",
        },
      ],
    }],

    "multiline-ternary": ["off"],

    // hooks
    "react-hooks/rules-of-hooks": "error",

    "lodash/import-scope": [2]
  },

  "globals": {
    "__DEV__": true,
    "FormData": true,
    "WebSocket": true,
    "WebSocketCloseEvent": true,
    "WebSocketErrorEvent": true,
    "WebSocketMessageEvent": true,
    "NodeJS": true
  },

  "env": {
    "react-native/react-native": true
  },

  "ignorePatterns": [
    ".eslintrc.js"
  ],

  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
