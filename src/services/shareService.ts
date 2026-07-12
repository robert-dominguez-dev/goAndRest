import Share from 'react-native-share';

const isUserDismissal = (error: unknown): boolean =>
  !!error &&
  typeof error === 'object' &&
  'message' in error &&
  typeof (error as { message: unknown }).message === 'string' &&
  ((error as { message: string }).message.includes('User did not share') ||
    (error as { message: string }).message.includes('CANCELLED') ||
    (error as { message: string }).message.includes('userDidNotShare'));

// Resolves to true when the file was shared, false when the user dismissed
// the native share sheet.
export const shareFile = async (
  path: string,
  filename: string,
): Promise<boolean> => {
  try {
    await Share.open({
      url: `file://${path}`,
      filename,
      type: 'application/json',
      failOnCancel: false,
    });
    return true;
  } catch (error) {
    if (isUserDismissal(error)) {
      return false;
    }
    throw error;
  }
};
