import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { countTotalWorkoutTime } from '../../LandingScreen/helpers/countTotalWorkoutTime.ts';
import { formatTimerTime } from '../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';
import { SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT } from './SavedWorkoutItemFooter.tsx';

type SavedWorkoutItemHeaderProps = {
  workout: AppStoredWorkout;
};

export const SavedWorkoutItemHeader = ({
  workout: {
    config,
    meta: { name },
  },
}: SavedWorkoutItemHeaderProps) => {
  const t = useAppTranslation();

  const totalWorkoutTime = countTotalWorkoutTime(config);

  return (
    <AppRow
      gap={'m'}
      paddingHorizontal={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT}>
      <AppText category={'subHeader'}>{name}</AppText>
      <AppView>
        <AppRow
          shrink
          gap={'sm'}
          alignItems={'center'}>
          <AppText
            category={'title'}
            colorStatus={'textMuted'}>
            {t('screens.savedWorkoutsScreen.existingWorkoutItem.totalTime')}
          </AppText>
          <AppText category={'subHeader'}>
            {formatTimerTime(totalWorkoutTime)}
          </AppText>
        </AppRow>
      </AppView>
    </AppRow>
  );
};
