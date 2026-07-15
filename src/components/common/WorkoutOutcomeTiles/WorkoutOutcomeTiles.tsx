import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppRow } from '../AppRow.tsx';
import { AppView } from '../AppView/AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppIcon } from '../AppIcon.tsx';
import { AppTimeView } from '../AppTimeView.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { getPressableOpacity } from '../../controls/helpers/getPressableOpacity.ts';
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
  // When provided, the difficulty tile becomes tappable (used on the finished
  // screen to (re)open the rating popup so the user can fill it in or correct
  // it). Left undefined elsewhere - e.g. in history detail - so the tile stays
  // read-only there.
  onDifficultyPress?: () => void;
};

const WorkoutOutcomeTilesComponent = ({
  sec,
  rpe,
  onDifficultyPress,
}: WorkoutOutcomeTilesProps) => {
  const t = useAppTranslation();

  const rpeLevel = rpe !== null ? RPE_LEVELS[rpe] : undefined;

  const rpeEmoji: string = rpeLevel?.face || DASH;

  const difficultyTile = (
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
        {onDifficultyPress && (
          <AppIcon
            name={'Pencil'}
            colorStatus={'textMuted'}
          />
        )}
      </AppRow>
    </StatBoxWithTitle>
  );

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
      {onDifficultyPress ? (
        <Pressable
          onPress={getOnPressWithHapticFeedbackConditionally(onDifficultyPress)}
          style={{ flex: 1, flexBasis: 0 }}>
          {({ pressed }) => (
            <AppView
              grow
              opacity={getPressableOpacity({ pressed, disabled: false })}>
              {difficultyTile}
            </AppView>
          )}
        </Pressable>
      ) : (
        difficultyTile
      )}
    </AppRow>
  );
};

export const WorkoutOutcomeTiles = memo(WorkoutOutcomeTilesComponent);
