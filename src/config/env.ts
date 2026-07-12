import { Platform } from 'react-native';

export const selectByPlatform = <T>({
  ios,
  android,
}: {
  ios: T;
  android: T;
}): T => (Platform.OS === 'ios' ? ios : android);
