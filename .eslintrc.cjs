module.exports = {
  root: true,
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': [
      'error',
      {
        additionalComponentNamePatterns: ['^(_?[A-Z].*)'],
      },
    ],
  },
};
