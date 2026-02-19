import { RouteProp } from '@react-navigation/core';
import type { ParamListBase } from '@react-navigation/routers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
> = {
  route: RouteProp<ParamList, RouteName>;
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
};
