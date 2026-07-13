import { JSX, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { WorkoutOutcomeTiles } from '../../../../common/WorkoutOutcomeTiles/WorkoutOutcomeTiles.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { FILL_CONTAINER_DIMENSION, UNLIMITED_NUMBER_OF_LINES, } from '../../../../../constants/common.ts';
import { workoutHistoryAtom } from '../../../../../contexts/atoms.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppWorkoutFieldValues } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getWorkoutConfigSignature } from '../../../../../contexts/workoutHistory/helpers/getWorkoutConfigSignature.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { formatHistoryDetailDate } from '../HistoryScreen/helpers/formatHistoryDate.ts';
import { HistoryDifficultyChart } from '../HistoryScreen/HistoryDifficultyChart.tsx';
import { HistoryChartEmpty } from '../HistoryScreen/components/HistoryChartEmpty.tsx';
import { SavedWorkoutItemBody } from '../SavedWorkoutsScreen/components/SavedWorkoutItemBody.tsx';
import {
  useSaveWorkoutBottomSheet
} from '../LandingScreen/components/LandingScreenFooter/hooks/useSaveWorkoutBottomSheet.tsx';

const MAX_COMPARED_ENTRIES = 14;
export const MIN_RATED_ENTRIES_FOR_CHART = 2;

type HistoryDetailScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.HistoryDetailScreen
>;

export const HistoryDetailScreen = ({
  route,
  navigation,
}: HistoryDetailScreenProps) => {
  const { entry: routeEntry } = route.params;

  const t = useAppTranslation();
  const { language } = useAppLanguage();

  const log = useAtomValue(workoutHistoryAtom);
  const setWorkoutHistory = useSetAtom(workoutHistoryAtom);
  const { storedWorkouts, storeWorkout } = useAppWorkouts();

  // Read the live entry from the log so a save (which back-fills the name)
  // is reflected immediately - e.g. the header title switches to the name.
  const entry = useMemo(
    () =>
      log.find(historyEntry => historyEntry.date === routeEntry.date) ??
      routeEntry,
    [log, routeEntry],
  );

  // Reuse the dashboard save flow: a FormProvider holding this workout's
  // config feeds the shared SaveWorkoutBottomSheetContent.
  const formProps = useForm<AppWorkoutFieldValues>({
    defaultValues: { ...routeEntry.config, workoutName: '' },
    reValidateMode: 'onBlur',
  });

  // Unlike the dashboard, saving from here does not navigate away - it just
  // stores the workout and names this one history entry.
  const handleSave = useCallback(
    ({ workoutName, ...workoutConfig }: AppWorkoutFieldValues) => {
      const savedWorkoutId = uuidv4();

      storeWorkout({
        id: savedWorkoutId,
        meta: { name: workoutName, createdAt: new Date() },
        config: workoutConfig,
      });

      setWorkoutHistory(
        log.map(historyEntry =>
          historyEntry.date === routeEntry.date
            ? { ...historyEntry, name: workoutName, savedWorkoutId }
            : historyEntry,
        ),
      );
    },
    [log, routeEntry.date, storeWorkout, setWorkoutHistory],
  );

  const { bottomSheet: saveWorkoutBottomSheet, openSaveWorkoutBottomSheet } =
    useSaveWorkoutBottomSheet(handleSave);

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

  const historyDetailDateFormatted = formatHistoryDetailDate(
    entry.date,
    language,
  );

  const headerTitle: JSX.Element | string = entry.name ? (
    <AppView>
      <AppText
        textAlign={'center'}
        category={'header'}>
        {entry.name}
      </AppText>
      <AppText
        colorStatus={'textMuted'}
        textAlign={'center'}>
        {historyDetailDateFormatted}
      </AppText>
    </AppView>
  ) : (
    historyDetailDateFormatted
  );

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
              backgroundColorStatus={'primary'}
            />
          ) : undefined
        }>
        <AppView
          alignItems={'center'}
          gap={'m'}>
          <WorkoutOutcomeTiles
            sec={entry.sec}
            rpe={entry.rpe}
          />
          <AppView
            gap={'s'}
            width={FILL_CONTAINER_DIMENSION}>
            <AppView>
              <AppText
                grow={false}
                category={'subHeader'}
                colorStatus={'textMuted'}>
                {t(
                  'screens.historyScreen.detailDifficultyChartTitle',
                ).toUpperCase()}
              </AppText>
              <AppText
                grow={false}
                colorStatus={'textMuted'}
                numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
                {entry.name
                  ? t(
                      'screens.historyScreen.detailDifficultyChartSubtitleNamed',
                      {
                        name: entry.name,
                      },
                    )
                  : t('screens.historyScreen.detailDifficultyChartSubtitle')}
              </AppText>
            </AppView>
            {hasEnoughDataForChart ? (
              <HistoryDifficultyChart data={chronologicalSiblings} />
            ) : (
              <HistoryChartEmpty />
            )}
          </AppView>
          {entry.config && (
            <AppView
              gap={'s'}
              width={FILL_CONTAINER_DIMENSION}>
              <AppText
                category={'subHeader'}
                colorStatus={'textMuted'}>
                {t('screens.historyScreen.detailConfigTitle').toUpperCase()}
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
