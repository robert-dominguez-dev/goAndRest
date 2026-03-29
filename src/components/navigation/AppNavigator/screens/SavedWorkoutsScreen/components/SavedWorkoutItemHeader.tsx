import { AppStoredWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { countTotalWorkoutTime } from '../../LandingScreen/helpers/countTotalWorkoutTime.ts';
import { formatTimerTime } from '../../../../../../helpers/formatTimerTime.tsx';
import { SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT } from './SavedWorkoutItemFooter.tsx';
import { AppIconAndLabel } from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';

type SavedWorkoutItemHeaderProps = {
  workout: AppStoredWorkout;
};

export const SavedWorkoutItemHeader = ({
  workout: {
    config,
    meta: { name },
  },
}: SavedWorkoutItemHeaderProps) => {
  const totalWorkoutTime = countTotalWorkoutTime(config);

  return (
    <AppRow
      gap={'m'}
      paddingHorizontal={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={SAVED_WORKOUT_HEADER_AND_FOOTER_HEIGHT}>
      <AppText category={'subHeader'}>{name}</AppText>
      <AppRow
        shrink
        gap={'s'}
        alignItems={'center'}>
        <AppIconAndLabel
          grow={false}
          category={'header'}
          iconName={'Clock'}
          label={formatTimerTime(totalWorkoutTime)}
        />
      </AppRow>
    </AppRow>
  );
};
