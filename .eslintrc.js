module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // The codebase deliberately uses `void` to mark intentionally
    // unawaited promises (the typescript-eslint-recommended idiom).
    'no-void': 'off',
  },
};
