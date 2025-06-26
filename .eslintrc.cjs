module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Ensures Prettier rules are applied last to avoid conflicts
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Add custom rules here if needed
    'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React to be in scope
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
