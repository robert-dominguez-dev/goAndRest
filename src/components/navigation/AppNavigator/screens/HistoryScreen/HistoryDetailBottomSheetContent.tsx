import { memo, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../common/AppRow.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import {
  DASH,
  FILL_CONTAINER_DIMENSION,
  ONE_SECOND_MS,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';
import { workoutHistoryAtom } from '../../../../../contexts/atoms.ts';
import { getWorkoutConfigSignature } from '../../../../../contexts/workoutHistory/helpers/getWorkoutConfigSignature.ts';
import { formatHistoryDetailDate } from './helpers/formatHistoryDate.ts';
import { HistoryDifficultyChart } from './HistoryDifficultyChart.tsx';
import { HistoryDetailSaveSection } from './components/HistoryDetailSaveSection.tsx';
import { SavedWorkoutItemBody } from '../SavedWorkoutsScreen/components/SavedWorkoutItemBody.tsx';

const MAX_COMPARED_ENTRIES = 14;
const MIN_RATED_ENTRIES_FOR_CHART = 2;

type HistoryDetailBottomSheetContentProps = {
  entry: WorkoutHistoryEntry;
};

const HistoryDetailBottomSheetContentComponent = ({
  entry,
}: HistoryDetailBottomSheetContentProps) => {
  const t = useAppTranslation();
  const { language } = useAppLanguage();

  const log = useAtomValue(workoutHistoryAtom);

  const rpeLevel = entry.rpe !== null ? RPE_LEVELS[entry.rpe] : undefined;

  const chronologicalSiblings = useMemo(() => {
    if (!entry.config) {
      return [];
    }

    const signature = getWorkoutConfigSignature(entry.config);

    const siblings = log.filter(
      historyEntry =>
        historyEntry.config &&
        getWorkoutConfigSignature(historyEntry.config) === signature,
    );

    return [...siblings]
      .sort((a, b) => a.date - b.date)
      .slice(-MAX_COMPARED_ENTRIES);
  }, [log, entry]);

  const ratedSiblings = chronologicalSiblings.filter(
    historyEntry => historyEntry.rpe !== null,
  );

  const hasEnoughDataForChart =
    ratedSiblings.length >= MIN_RATED_ENTRIES_FOR_CHART;

  return (
    <AppView
      alignItems={'center'}
      gap={'m'}>
      {entry.name && (
        <AppText
          colorStatus={'textMuted'}
          textAlign={'center'}
          fontSizeOverride={'sm'}>
          {formatHistoryDetailDate(entry.date, language)}
        </AppText>
      )}
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
            {t('screens.historyScreen.detailTotalTime')}
          </AppText>
          <AppTimeView
            fontSizeOverride={40}
            msLeft={entry.sec * ONE_SECOND_MS}
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
            {t('screens.historyScreen.detailDifficulty')}
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
      <AppView
        gap={'xs'}
        width={FILL_CONTAINER_DIMENSION}>
        <AppText
          category={'subHeader'}
          colorStatus={'textMuted'}>
          {t('screens.historyScreen.detailDifficultyChartTitle')}
        </AppText>
        <AppText
          colorStatus={'textMuted'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {entry.name
            ? t('screens.historyScreen.detailDifficultyChartSubtitleNamed', {
                name: entry.name,
              })
            : t('screens.historyScreen.detailDifficultyChartSubtitle')}
        </AppText>
        {hasEnoughDataForChart ? (
          <HistoryDifficultyChart data={chronologicalSiblings} />
        ) : (
          <AppText
            colorStatus={'textMuted'}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('screens.historyScreen.detailDifficultyChartEmpty')}
          </AppText>
        )}
      </AppView>
      {entry.config && (
        <AppView
          gap={'xs'}
          width={FILL_CONTAINER_DIMENSION}>
          <AppText
            category={'subHeader'}
            colorStatus={'textMuted'}>
            {t('screens.historyScreen.detailConfigTitle')}
          </AppText>
          <AppDivider />
          <SavedWorkoutItemBody config={entry.config} />
        </AppView>
      )}
      <HistoryDetailSaveSection entry={entry} />
    </AppView>
  );
};

export const HistoryDetailBottomSheetContent = memo(
  HistoryDetailBottomSheetContentComponent,
);
