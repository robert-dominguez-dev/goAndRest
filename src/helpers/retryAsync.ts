const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 200;

export const retryAsync = async <T>(
  fn: () => Promise<T>,
  attemptsLeft = MAX_ATTEMPTS,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);

    if (attemptsLeft <= 1) {
      throw error;
    }

    await new Promise<void>(resolve =>
      setTimeout(() => resolve(), RETRY_DELAY_MS),
    );

    return retryAsync(fn, attemptsLeft - 1);
  }
};
