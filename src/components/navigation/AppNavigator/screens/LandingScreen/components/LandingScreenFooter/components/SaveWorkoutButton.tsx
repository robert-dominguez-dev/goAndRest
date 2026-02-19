import { Save } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { v4 as uuidv4 } from 'uuid';
import { useRootStackNavigation } from '../../../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../../../types.ts';
import { useSaveWorkoutBottomSheet } from '../hooks/useSaveWorkoutBottomSheet.tsx';

export const SaveWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { storeWorkout } = useAppWorkouts();

  const navigation = useRootStackNavigation();

  const handleSave = ({ workoutName, ...workoutConfig }: AppWorkout) => {
    storeWorkout({
      id: uuidv4(),
      meta: {
        name: workoutName,
        createdAt: new Date(),
      },
      config: workoutConfig,
    });

    navigation.navigate(AppNavigatorScreen.SavedWorkoutsScreen);
  };

  const { bottomSheet, openSaveWorkoutBottomSheet } =
    useSaveWorkoutBottomSheet(handleSave);

  return (
    <>
      <AppRoundedButton
        onPress={openSaveWorkoutBottomSheet}
        size={'s'}
        status={'grayscale'}>
        <Save
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {bottomSheet}
    </>
  );
};
