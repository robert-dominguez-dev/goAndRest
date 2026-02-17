import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { countTotalWorkoutTime } from '../../LandingScreen/helpers/countTotalWorkoutTime.ts';
import { formatTimerTime } from '../../../../../common/AppCountdownText/helpers/formatTimerTime.tsx';

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
      grow
      gap={'m'}
      paddingHorizontal={'m'}
      paddingVertical={'xs'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <AppView alignItems={'center'}>
        <AppText category={'header'}>{name}</AppText>
      </AppView>
      <AppView>
        <AppRow
          shrink
          gap={'s'}
          alignItems={'center'}>
          <AppText
            category={'title'}
            colorStatus={'rounds'}>
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
