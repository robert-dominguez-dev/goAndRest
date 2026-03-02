import { TranslateFN } from '../../../../../../../../locales/hooks/useAppTranslation.ts';

export const composeLastWorkoutButtonLabel = (
  workoutName: string | undefined,
  t: TranslateFN,
): string => {
  const labelPrefix = t('screens.landingScreen.lastRunningWorkoutButtonLabel');

  const labelPostfix: string | undefined = workoutName
    ? `: ${workoutName}`
    : undefined;

  return labelPostfix ? labelPrefix + labelPostfix : labelPrefix;
};
