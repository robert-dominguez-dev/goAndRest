import { Save } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { SaveWorkoutBottomSheet } from './SaveWorkoutBottomSheet.tsx';
import { useIsVisible } from '../../../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { v4 as uuidv4 } from 'uuid';

export const SaveWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { isVisible, onOpen, onClose } = useIsVisible();

  const { storeWorkout } = useAppWorkouts();

  const handleSave = ({ workoutName, ...workoutConfig }: AppWorkout) => {
    storeWorkout({
      id: uuidv4(),
      meta: {
        name: workoutName,
        createdAt: new Date(),
      },
      config: workoutConfig,
    });

    onClose();
  };

  return (
    <>
      <AppRoundedButton
        onPress={onOpen}
        size={'s'}
        status={'grayscale'}>
        <Save
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      <SaveWorkoutBottomSheet
        isVisible={isVisible}
        onClose={onClose}
        onSave={handleSave}
      />
    </>
  );
};
