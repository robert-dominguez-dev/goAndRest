import { isDisclaimerInfoAgreedAtom } from '../../contexts/atoms.ts';
import { useAtomValue } from 'jotai';
import { AppNavigator } from './AppNavigator/AppNavigator.tsx';
import { DisclaimerNavigator } from './DisclaimerNavigator/DisclaimerNavigator.tsx';

export const AppNavigators = () => {
  const isDisclaimerInfoAgreed = useAtomValue(isDisclaimerInfoAgreedAtom);
  return isDisclaimerInfoAgreed ? <AppNavigator /> : <DisclaimerNavigator />;
};
