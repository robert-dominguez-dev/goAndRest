import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { WorkoutOutcomeTiles } from '../../../../common/WorkoutOutcomeTiles/WorkoutOutcomeTiles.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../constants/common.ts';
import { workoutHistoryAtom } from '../../../../../contexts/atoms.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppWorkoutFieldValues } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getWorkoutConfigSignature } from '../../../../../contexts/workoutHistory/helpers/getWorkoutConfigSignature.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { formatHistoryDetailDate } from '../HistoryScreen/helpers/formatHistoryDate.ts';
import { HistoryDifficultyChart } from '../HistoryScreen/HistoryDifficultyChart.tsx';
import { SavedWorkoutItemBody } from '../SavedWorkoutsScreen/components/SavedWorkoutItemBody.tsx';
import { useSaveWorkoutBottomSheet } from '../LandingScreen/components/LandingScreenFooter/hooks/useSaveWorkoutBottomSheet.tsx';

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
  const { storedWorkouts } = useAppWorkouts();

  // Reuse the dashboard save flow: a FormProvider holding this workout's
  // config feeds the shared SaveWorkoutBottomSheetContent.
  const formProps = useForm<AppWorkoutFieldValues>({
    defaultValues: { ...entry.config, workoutName: '' },
    reValidateMode: 'onBlur',
  });

  const { bottomSheet: saveWorkoutBottomSheet, openSaveWorkoutBottomSheet } =
    useSaveWorkoutBottomSheet();

  const canSave =
    !!entry.config &&
    !storedWorkouts.some(workout => workout.id === entry.savedWorkoutId);

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
    <FormProvider {...formProps}>
      <AppScreenLayout
        scrollable
        headerTitle={headerTitle}
        headerAccessoryLeftIconName={'ArrowLeft'}
        onHeaderAccessoryLeftPress={navigation.goBack}
        footer={
          canSave ? (
            <AppButton
              label={t('screens.historyScreen.detailSave')}
              onPress={openSaveWorkoutBottomSheet}
              iconName={'Save'}
              backgroundColorStatus={'primary'}
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
        </AppView>
      </AppScreenLayout>
      {saveWorkoutBottomSheet}
    </FormProvider>
  );
};
