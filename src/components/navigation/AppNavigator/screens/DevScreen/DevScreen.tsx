import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { premiumCharacterActivationsAtom } from '../../../../../contexts/atoms.ts';
import { useAtom } from 'jotai';

type DevScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.DevScreen
>;

export const DevScreen = ({ navigation }: DevScreenProps) => {
  const [premiumCharacterActivations, setPremiumCharacterActivations] = useAtom(
    premiumCharacterActivationsAtom,
  );

  const deletePremiumVoices = async () => {
    console.log('BEFORE:', premiumCharacterActivations);
    await setPremiumCharacterActivations({});
  };

  return (
    <AppScreenLayout
      headerTitle={'DEV SCREEN'}
      headerAccessoryLeftIconName={'ArrowLeft'}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppButton
        label={'DELETE PREMIUM VOICES'}
        onPress={deletePremiumVoices}
        backgroundColorStatus={'negative'}
      />
    </AppScreenLayout>
  );
};
