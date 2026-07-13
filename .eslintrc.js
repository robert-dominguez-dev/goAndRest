module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // The codebase deliberately uses `void` to mark intentionally
    // unawaited promises (the typescript-eslint-recommended idiom).
    'no-void': 'off',
    // A missing/extra dependency is a hint, not a hard failure - the timer
    // hooks intentionally curate their dependency arrays.
    'react-hooks/exhaustive-deps': 'warn',
  },
};
