import { KeyboardType } from 'react-native';

export const getAppInputKeyboardType = (
  numeric: boolean | undefined,
): KeyboardType => (numeric ? 'numeric' : 'default');
