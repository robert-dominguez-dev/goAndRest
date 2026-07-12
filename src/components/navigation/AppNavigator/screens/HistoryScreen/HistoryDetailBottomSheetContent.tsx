import { memo } from 'react';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../common/AppRow.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import {
  DASH,
  FILL_CONTAINER_DIMENSION,
  ONE_SECOND_MS,
} from '../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';

type HistoryDetailBottomSheetContentProps = {
  entry: WorkoutHistoryEntry;
};

const HistoryDetailBottomSheetContentComponent = ({
  entry,
}: HistoryDetailBottomSheetContentProps) => {
  const t = useAppTranslation();

  const rpeLevel = entry.rpe !== null ? RPE_LEVELS[entry.rpe] : undefined;

  const minutes = Math.round(entry.sec / 60);

  return (
    <AppView
      gap={'m'}
      alignItems={'center'}>
      <AppView alignItems={'center'}>
        <AppText
          category={'subHeader'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.historyScreen.detailTotalTime')}
        </AppText>
        <AppTimeView
          fontSizeOverride={80}
          msLeft={entry.sec * ONE_SECOND_MS}
        />
      </AppView>
      <AppDivider />
      <AppView
        alignItems={'center'}
        gap={'xs'}>
        <AppText
          category={'subHeader'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.historyScreen.detailDifficulty')}
        </AppText>
        <AppText
          category={'header'}
          fontSizeOverride={'xl'}
          textAlign={'center'}>
          {rpeLevel ? rpeLevel.face : DASH}
        </AppText>
        {rpeLevel && (
          <AppText
            category={'contentBold'}
            textAlign={'center'}>
            {t(rpeLevel.labelKey)}
          </AppText>
        )}
      </AppView>
      <AppRow
        gap={'s'}
        width={FILL_CONTAINER_DIMENSION}>
        <AppView
          grow
          flexBasis={0}
          alignItems={'center'}
          backgroundColorStatus={'backgroundAlt'}
          borderRadius={'m'}
          paddingVertical={'s'}
          paddingHorizontal={'s'}>
          <AppText
            category={'header'}
            textAlign={'center'}>
            {entry.rounds || 0}
          </AppText>
          <AppText
            category={'contentBold'}
            colorStatus={'textMuted'}
            textAlign={'center'}>
            {t('screens.historyScreen.detailRoundsTile')}
          </AppText>
        </AppView>
        <AppView
          grow
          flexBasis={0}
          alignItems={'center'}
          backgroundColorStatus={'backgroundAlt'}
          borderRadius={'m'}
          paddingVertical={'s'}
          paddingHorizontal={'s'}>
          <AppText
            category={'header'}
            textAlign={'center'}>
            {minutes}
          </AppText>
          <AppText
            category={'contentBold'}
            colorStatus={'textMuted'}
            textAlign={'center'}>
            {t('screens.historyScreen.detailMinutesTile')}
          </AppText>
        </AppView>
      </AppRow>
    </AppView>
  );
};

export const HistoryDetailBottomSheetContent = memo(
  HistoryDetailBottomSheetContentComponent,
);
