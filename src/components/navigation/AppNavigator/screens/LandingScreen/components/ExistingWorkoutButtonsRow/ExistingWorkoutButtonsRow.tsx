import { AppRow } from '../../../../../../common/AppRow.tsx';
import { ScrollView } from 'react-native';
import { AppSize } from '../../../../../../../types/ui.ts';
import { AddExistingWorkoutButton } from './components/AddExistingWorkoutButton.tsx';
import { AppRoundedButtonSize } from '../../../../../../controls/AppRoundedButton/constants.ts';
import { EXISTING_WORKOUT_BUTTON_SIZE } from '../../constants.ts';
import { checkShouldUseScrollViewForExistingWorkouts } from '../../helpers/checkShouldUseScrollViewForExistingWorkouts.ts';
import { HORIZONTAL_SCREEN_PADDING } from '../../../../../../common/AppScreenLayout.tsx';
import { useScreenWidth } from '../../../../../../../hooks/useScreenWidth.ts';
import { ReactNode } from 'react';
import { ExistingWorkoutButtons } from './components/ExistingWorkoutButtons.tsx';
import { AppStoredWorkout } from '../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { GRADIENT_BORDER_WIDTH } from '../../../../../../common/AppViewWithGradientBorder.tsx';

const GAP_SIZE = AppSize.s;

const existingWorkoutButtonElements = <ExistingWorkoutButtons />;

type ExistingWorkoutButtonsRowProps = {
  workouts: AppStoredWorkout[];
};

export const ExistingWorkoutButtonsRow = ({
  workouts,
}: ExistingWorkoutButtonsRowProps) => {
  const screenWidth = useScreenWidth();

  const shouldUseScrollViewForExistingWorkouts =
    checkShouldUseScrollViewForExistingWorkouts({
      /**
       * Adding one for `AddExistingWorkoutButton`...
       */
      numberOfButtons: workouts.length + 1,
      buttonSize:
        AppRoundedButtonSize[EXISTING_WORKOUT_BUTTON_SIZE] +
        GRADIENT_BORDER_WIDTH * 2,
      gapSize: GAP_SIZE,
      allPaddings: HORIZONTAL_SCREEN_PADDING * 2,
      screenWidth,
    });

  const buttonsElement: ReactNode = shouldUseScrollViewForExistingWorkouts ? (
    <ScrollView
      horizontal
      contentContainerStyle={{ gap: GAP_SIZE }}
      showsHorizontalScrollIndicator={false}>
      {existingWorkoutButtonElements}
    </ScrollView>
  ) : (
    existingWorkoutButtonElements
  );

  return (
    <AppRow gap={GAP_SIZE}>
      <AddExistingWorkoutButton />
      {buttonsElement}
    </AppRow>
  );
};
