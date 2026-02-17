import { memo } from 'react';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { ArrowRight, SaveAll } from 'lucide-react-native';
import { useRootStackNavigation } from '../../../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../../../types.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../../../../../../../controls/AppButton/components/AppButtonIconAndLabel.tsx';

const SavedWorkoutsButtonComponent = () => {
  const { text } = useAppThemedColors();

  const navigation = useRootStackNavigation();

  const goToSavedWorkouts = () =>
    navigation.navigate(AppNavigatorScreen.SavedWorkoutsScreen);

  return (
    <AppButton
      label={'Vybrat uložený trénink'}
      backgroundColorStatus={'transparent'}
      borderColorStatus={'text'}
      borderStyle={'dotted'}
      value={
        <ArrowRight
          color={text}
          size={categoryToIconSize.subHeader}
        />
      }
      IconComponent={SaveAll}
      onPress={goToSavedWorkouts}
    />
  );
};

export const SavedWorkoutsButton = memo(SavedWorkoutsButtonComponent);
