module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parser': 'babel-eslint',
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 11,
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'react/prop-types': [0],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          'array': true,
          'object': true,
        },
        AssignmentExpression: {
          'array': false,
          'object': false,
        },
      },
    ],
    'react/display-name': 0,
    'react/jsx-space-before-closing': 2,
  },
}
