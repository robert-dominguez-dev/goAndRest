import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppInput } from '../../../../../../../controls/AppInput/AppInput.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { getWorkoutNameRules } from '../../../../../../../controls/helpers/getWorkoutNameRules.ts';
import { TranslateKey } from '../../../../../../../../locales/types.ts';
import { memo, useCallback, useEffect } from 'react';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';
import { AppBottomSheetRenderContentProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useRootStackNavigation } from '../../../../../../hooks/useRootStackNavigation.ts';
import { v4 as uuidv4 } from 'uuid';
import { AppNavigatorScreen } from '../../../../../types.ts';

const SaveWorkoutBottomSheetContentComponent = ({
  onClose,
}: AppBottomSheetRenderContentProps) => {
  const t = useAppTranslation();

  const { storeWorkout } = useAppWorkouts();

  const navigation = useRootStackNavigation();

  const handleSaveWorkout = ({
    workoutName,
    ...workoutConfig
  }: AppWorkoutFieldValues) => {
    storeWorkout({
      id: uuidv4(),
      meta: {
        name: workoutName,
        createdAt: new Date(),
      },
      config: workoutConfig,
    });

    navigation.navigate(AppNavigatorScreen.SavedWorkoutsScreen);
  };

  const rules = getWorkoutNameRules(t);

  const { control, handleSubmit, trigger } =
    useFormContext<AppWorkoutFieldValues>();

  const { isValid, errors } = useFormState<AppWorkoutFieldValues>({
    control,
    name: 'workoutName',
  });

  const errorMessage = errors.workoutName?.message;

  const triggerValidation = useCallback(
    () => void trigger('workoutName'),
    [trigger],
  );

  useEffect(() => {
    const hasStaleErrorMessage: boolean = isValid && !!errorMessage;

    if (hasStaleErrorMessage) {
      triggerValidation();
    }
  }, [isValid, errorMessage, triggerValidation]);

  const buttonLabelTranslateKey: TranslateKey = isValid
    ? 'screens.landingScreen.saveWorkoutBottomSheet.positiveButtonLabel'
    : 'screens.landingScreen.saveWorkoutBottomSheet.invalidButtonLabel';

  const handleSave = () => {
    handleSubmit(handleSaveWorkout)();
    onClose();
  };

  return (
    <AppView gap={'l'}>
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t('screens.landingScreen.saveWorkoutBottomSheet.description')}
      </AppText>
      <AppInput
        name={'workoutName'}
        label={t('screens.landingScreen.saveWorkoutBottomSheet.inputLabel')}
        control={control}
        rules={rules}
        autoFocus
        shouldUnregister
      />
      <AppButton
        label={t(buttonLabelTranslateKey)}
        onPress={handleSave}
        onDisabledPress={triggerValidation}
        backgroundColorStatus={'primary'}
        disabled={!isValid}
      />
    </AppView>
  );
};

export const SaveWorkoutBottomSheetContent = memo(
  SaveWorkoutBottomSheetContentComponent,
);
