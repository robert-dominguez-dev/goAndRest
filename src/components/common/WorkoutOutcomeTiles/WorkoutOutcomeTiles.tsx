import { memo } from 'react';
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
import { SMALLER_SUMMARY_CARD_WIDTH } from '../../navigation/AppNavigator/screens/HistoryScreen/components/WeekStatsRow.tsx';
import { StatBoxWithTitle } from '../../navigation/AppNavigator/screens/HistoryScreen/components/StatBoxWithTitle.tsx';

const RPE_FONT_SIZE_OVERRIDE = 30;
const RPE_LINE_HEIGHT_MULTIPLIER = 1.2;

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

  const rpeEmoji: string = rpeLevel?.face || DASH;

  return (
    <AppRow
      gap={'sm'}
      width={FILL_CONTAINER_DIMENSION}>
      <StatBoxWithTitle
        width={SMALLER_SUMMARY_CARD_WIDTH}
        title={t('common.workoutOutcome.totalTime')}>
        <AppTimeView
          fontSizeOverride={40}
          msLeft={sec * ONE_SECOND_MS}
        />
      </StatBoxWithTitle>
      <StatBoxWithTitle title={t('common.workoutOutcome.difficulty')}>
        <AppRow
          gap={'sm'}
          alignItems={'center'}
          justifyContent={'center'}>
          <AppText
            grow={false}
            category={'header'}
            fontSizeOverride={RPE_FONT_SIZE_OVERRIDE}
            lineHeightMultiplier={RPE_LINE_HEIGHT_MULTIPLIER}>
            {rpeEmoji}
          </AppText>
          {rpeLevel && (
            <AppText
              grow={false}
              category={'header'}
              fontSizeOverride={RPE_FONT_SIZE_OVERRIDE}
              lineHeightMultiplier={RPE_LINE_HEIGHT_MULTIPLIER}>
              {t(rpeLevel.labelKey).toUpperCase()}
            </AppText>
          )}
        </AppRow>
      </StatBoxWithTitle>
    </AppRow>
  );
};

export const WorkoutOutcomeTiles = memo(WorkoutOutcomeTilesComponent);
