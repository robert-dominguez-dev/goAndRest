import { GestureResponderEvent } from 'react-native';

export const preventDefaultHandler = (event: GestureResponderEvent) =>
  event.preventDefault();
