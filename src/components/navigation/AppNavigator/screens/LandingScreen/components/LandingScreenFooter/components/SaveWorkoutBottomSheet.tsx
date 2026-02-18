import { X } from 'lucide-react-native';
import { useFormContext, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppBottomSheet } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import { AppInput } from '../../../../../../../controls/AppInput/AppInput.tsx';
import { AppText } from '../../../../../../../common/AppText/AppText.tsx';
import { AppButton } from '../../../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { getWorkoutNameRules } from '../../../../../../../controls/helpers/getWorkoutNameRules.ts';
import { TranslateKey } from '../../../../../../../../locales/types.ts';
import { memo, useCallback, useEffect } from 'react';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../../../constants/common.ts';

type SaveWorkoutButtonProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (workout: AppWorkout) => void;
};

const SaveWorkoutBottomSheetComponent = ({
  isVisible,
  onClose,
  onSave,
}: SaveWorkoutButtonProps) => {
  const t = useAppTranslation();

  const rules = getWorkoutNameRules(t);

  const { control, handleSubmit, trigger } = useFormContext<AppWorkout>();

  const { isValid, errors } = useFormState<AppWorkout>({
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

  const bottomSheetContent = (
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
        onPress={handleSubmit(onSave)}
        onDisabledPress={triggerValidation}
        backgroundColorStatus={'primary'}
        disabled={!isValid}
      />
    </AppView>
  );

  return (
    <AppBottomSheet
      closeable
      scrollable={false}
      bottomSheetTitle={t('screens.landingScreen.saveWorkoutBottomSheet.title')}
      isVisible={isVisible}
      bottomSheetContent={bottomSheetContent}
      backgroundColorStatus={'backgroundAlt'}
      AccessoryRightIconComponent={X}
      onClose={onClose}
    />
  );
};

export const SaveWorkoutBottomSheet = memo(SaveWorkoutBottomSheetComponent);
