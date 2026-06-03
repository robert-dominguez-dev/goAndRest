const UNKNOWN_ERROR_MESSAGE = 'Unknown error';

export const getErrorMessage = (error: unknown): string => {
  const hasErrorMessage =
    !!error && typeof error === 'object' && 'message' in error;

  if (!hasErrorMessage) {
    return UNKNOWN_ERROR_MESSAGE;
  }

  return typeof error.message === 'string'
    ? error.message
    : UNKNOWN_ERROR_MESSAGE;
};
