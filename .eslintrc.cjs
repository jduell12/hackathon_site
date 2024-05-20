/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    '@pendo/eslint-config',
    '@pendo/eslint-config/vue',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue-scoped-css/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'arrow-body-style': 0,
    'camelcase': ['error', { allow: ['i18n_t', 'i18n_tf', 'i18n_locale'], properties: 'never' }],
    'class-methods-use-this': 0,
    'filenames/match-regex': [2, '^([a-z0-9-\\.]+|_index)$', false],
    'jasmine/new-line-before-expect': 0,
    'jasmine/new-line-between-declarations': 0,
    'jasmine/no-expect-in-setup-teardown': 0,
    'jasmine/no-promise-without-done-fail': 0,
    'jasmine/no-spec-dupes': 0,
    'jasmine/no-suite-dupes': 0,
    'jasmine/prefer-toHaveBeenCalledWith': 0,
    'jest/no-focused-tests': 2,
    'jest/valid-expect-in-promise': 2,
    'lodash/import-scope': [2, 'method'],
    'no-param-reassign': 0,
    'no-warning-comments': 'warn',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // prevent direct import of axios
          // correct: import { http } from '@pendo/http';
          {
            name: 'axios',
            importNames: ['default'],
            message: 'Please use the `@pendo/http` package instead.'
          }
        ]
      }
    ],
    'internal-rules/composable-consistent-naming': 2,
    'internal-rules/no-exist-cypress-assert': 0,
    'internal-rules/no-store-in-composables': 2,
    'internal-rules/no-restricted-imports-clone': [
      'warn',
      {
        patterns: [
          // will change to error in the future as part of APP-81423
          // to prevent import of ngDeps
          {
            group: ['**/angular-vue-connection'],
            message: 'Please avoid importing ngDeps to facilitate our migration away from AngularJS.'
          }
        ]
      }
    ],
    'internal-rules/no-unused-properties': [
      'error',
      {
        groups: ['props', 'data', 'computed', 'methods'],
        ignorePublicMembers: true,
        deepData: false
      }
    ],
    'vue/multi-word-component-names': 0,
    'vue/require-explicit-emits': 'error',
    // Disabled until this is fixed: https://github.com/future-architect/eslint-plugin-vue-scoped-css/issues/282
    'vue-scoped-css/no-unused-selector': 0,
    'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped'] }],

  },
}
