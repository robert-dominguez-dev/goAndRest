import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DisclaimerNavigatorScreen,
  DisclaimerNavigatorScreenParams,
} from './types.ts';

import { memo } from 'react';
import { commonAppNavigationOptions } from '../constants.ts';
import { DisclaimerScreen } from './screens/DisclaimerScreen.tsx';

const Stack = createNativeStackNavigator<
  DisclaimerNavigatorScreenParams,
  string
>();

const AppNavigatorComponent = () => (
  <Stack.Navigator
    id={'DISCLAIMER_NAVIGATOR'}
    screenOptions={commonAppNavigationOptions}>
    <Stack.Screen
      name={DisclaimerNavigatorScreen.DisclaimerScreen}
      component={DisclaimerScreen}
    />
  </Stack.Navigator>
);

export const DisclaimerNavigator = memo(AppNavigatorComponent);
