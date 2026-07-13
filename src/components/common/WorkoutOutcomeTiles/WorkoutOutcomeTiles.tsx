import { memo } from 'react';
import { AppView } from '../AppView/AppView.tsx';
import { AppRow } from '../AppRow.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppTimeView } from '../AppTimeView.tsx';
import { useAppTranslation } from '../../../locales/hooks/useAppTranslation.ts';
import {
  DASH,
  FILL_CONTAINER_DIMENSION,
  ONE_SECOND_MS,
} from '../../../constants/common.ts';
import { RPE_LEVELS } from '../../../constants/rpe.ts';

type WorkoutOutcomeTilesProps = {
  sec: number;
  rpe: number | null;
};

const WorkoutOutcomeTilesComponent = ({
  sec,
  rpe,
}: WorkoutOutcomeTilesProps) => {
  const t = useAppTranslation();

  const rpeLevel = rpe !== null ? RPE_LEVELS[rpe] : undefined;

  return (
    <AppRow
      gap={'s'}
      width={FILL_CONTAINER_DIMENSION}>
      <AppView
        grow
        flexBasis={0}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        padding={'m'}>
        <AppText
          category={'content'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('common.workoutOutcome.totalTime')}
        </AppText>
        <AppTimeView
          fontSizeOverride={40}
          msLeft={sec * ONE_SECOND_MS}
        />
      </AppView>
      <AppView
        grow
        flexBasis={0}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        padding={'m'}>
        <AppText
          category={'content'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('common.workoutOutcome.difficulty')}
        </AppText>
        <AppRow
          gap={'xs'}
          alignItems={'center'}
          justifyContent={'center'}>
          <AppText fontSizeOverride={30}>
            {rpeLevel ? rpeLevel.face : DASH}
          </AppText>
          {rpeLevel && (
            <AppText category={'contentBold'}>{t(rpeLevel.labelKey)}</AppText>
          )}
        </AppRow>
      </AppView>
    </AppRow>
  );
};

export const WorkoutOutcomeTiles = memo(WorkoutOutcomeTilesComponent);
