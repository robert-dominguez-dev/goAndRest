import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { WorkoutOutcomeTiles } from '../../../../common/WorkoutOutcomeTiles/WorkoutOutcomeTiles.tsx';
import { AppInput } from '../../../../controls/AppInput/AppInput.tsx';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { getWorkoutNameRules } from '../../../../controls/helpers/getWorkoutNameRules.ts';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../constants/common.ts';
import { workoutHistoryAtom } from '../../../../../contexts/atoms.ts';
import { getWorkoutConfigSignature } from '../../../../../contexts/workoutHistory/helpers/getWorkoutConfigSignature.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { formatHistoryDetailDate } from '../HistoryScreen/helpers/formatHistoryDate.ts';
import { HistoryDifficultyChart } from '../HistoryScreen/HistoryDifficultyChart.tsx';
import { SavedWorkoutItemBody } from '../SavedWorkoutsScreen/components/SavedWorkoutItemBody.tsx';
import { useHistoryDetailSave } from './hooks/useHistoryDetailSave.ts';

const MAX_COMPARED_ENTRIES = 14;
const MIN_RATED_ENTRIES_FOR_CHART = 2;

type HistoryDetailScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.HistoryDetailScreen
>;

export const HistoryDetailScreen = ({
  route,
  navigation,
}: HistoryDetailScreenProps) => {
  const { entry } = route.params;

  const t = useAppTranslation();
  const { language } = useAppLanguage();

  const log = useAtomValue(workoutHistoryAtom);

  const { control, formState, handleSave, canSave } =
    useHistoryDetailSave(entry);

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

  const headerTitle =
    entry.name || formatHistoryDetailDate(entry.date, language);

  return (
    <AppScreenLayout
      scrollable
      headerTitle={headerTitle}
      headerAccessoryLeftIconName={'ArrowLeft'}
      onHeaderAccessoryLeftPress={navigation.goBack}
      footer={
        canSave ? (
          <AppButton
            label={t('screens.historyScreen.detailSave')}
            onPress={handleSave}
            iconName={'Save'}
            backgroundColorStatus={'primary'}
            disabled={!formState.isValid}
          />
        ) : undefined
      }>
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
        <WorkoutOutcomeTiles
          sec={entry.sec}
          rpe={entry.rpe}
        />
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
        {canSave && (
          <AppView width={FILL_CONTAINER_DIMENSION}>
            <AppInput
              name={'workoutName'}
              control={control}
              rules={getWorkoutNameRules(t)}
              label={t(
                'screens.landingScreen.saveWorkoutBottomSheet.inputLabel',
              )}
            />
          </AppView>
        )}
      </AppView>
    </AppScreenLayout>
  );
};
