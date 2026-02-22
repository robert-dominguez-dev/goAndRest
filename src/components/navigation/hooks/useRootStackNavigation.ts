import { useNavigation } from '@react-navigation/native';
import {
  AppNavigatorScreen,
  AppNavigatorScreenParams,
} from '../AppNavigator/types.ts';
import { ROOT_STACK_NAVIGATOR_ID } from '../constants.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootNavigation = NativeStackNavigationProp<
  AppNavigatorScreenParams,
  AppNavigatorScreen,
  string
>;

/**
 * ⚠️ Make sure you use this hook inside the `AppNavigator`...
 */
export const useRootStackNavigation = (): RootNavigation => {
  const navigation = useNavigation<RootNavigation>();
  return navigation.getParent(ROOT_STACK_NAVIGATOR_ID);
};
